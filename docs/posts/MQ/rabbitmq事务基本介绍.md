---
title: rabbitmq事务基本介绍和go的使用示例
date: 2024-02-25 01:37:57
tags:
 - rabbitmq 
 - 消息队列
categories:
 - mq
---

RabbitMQ 提供了基本的事务机制，允许生产者保证消息的发布过程中的原子性。这意味着你可以在发送消息之前开始一个事务，然后发送多条消息，并在最后提交这个事务。如果在事务中的任何点发生错误，你可以回滚事务，这样就好像这些消息从未被发送过一样。

### RabbitMQ 事务的基本操作

RabbitMQ 事务机制包含三个基本操作：

1. **txSelect**：用于将当前channel（通道）标记为事务模式。
2. **txCommit**：用于提交事务，确保所有在事务内发送的消息都被确认。
3. **txRollback**：用于回滚事务，取消事务内进行的所有消息发送。

### 使用事务的步骤

1. **开启事务**：首先，通过调用`txSelect`方法在一个channel上开启事务。
2. **发送消息**：在事务模式下，你可以发送一条或多条消息到队列。
3. **提交或回滚**：如果消息成功发送，你可以通过调用`txCommit`提交事务，这时消息会被实际发送到队列中。如果在发送消息时遇到任何问题，或者你出于某种原因需要取消发送的消息，可以调用`txRollback`来回滚事务，这样事务中的所有消息发送操作都会被取消。

### 事务的性能影响

虽然事务提供了一种保证消息发送原子性的方法，但是它也有一定的性能影响。每次事务提交时，RabbitMQ 都需要将事务中的所有消息写入磁盘，这会导致相比非事务发送操作有较大的延迟。因此，如果你追求高吞吐量，使用事务可能不是最佳选择。

### 替代方案：确认模式

作为事务的替代方案，RabbitMQ 还提供了发布确认（publisher confirms）模式。这种模式提供了一种轻量级的方式来确认消息是否已经被RabbitMQ接收。相比于事务，发布确认模式在保证消息可靠性的同时，对性能的影响较小，因此在需要高性能的场景下更受推荐。

<!-- more -->

### 总结

RabbitMQ 的事务功能提供了一种保证消息发送原子性的机制，适用于需要严格消息发送一致性的场景。然而，由于其性能开销，对于高吞吐量需求，建议使用发布确认模式作为替代方案。在设计分布式系统和消息传递策略时，需要根据具体的业务需求和性能要求选择合适的消息确认机制。


## Go使用RabbitMq的例子

首先，确保已经安装了RabbitMQ服务器，并且Go的amqp包也已经安装。如果还没有安装amqp包，可以通过以下命令安装：

```bash
go get github.com/streadway/amqp
```

下面是一个使用RabbitMQ事务的Go示例：

```go
package main

import (
    "log"
    "github.com/streadway/amqp"
)

func failOnError(err error, msg string) {
    if err != nil {
        log.Fatalf("%s: %s", msg, err)
    }
}

func main() {
    conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
    failOnError(err, "Failed to connect to RabbitMQ")
    defer conn.Close()

    ch, err := conn.Channel()
    failOnError(err, "Failed to open a channel")
    defer ch.Close()

    // 将channel设置为事务模式
    err = ch.Tx()
    failOnError(err, "Failed to set channel to transaction mode")

    q, err := ch.QueueDeclare(
        "task_queue", // 队列名称
        true,         // 持久化
        false,        // 自动删除
        false,        // 独占
        false,        // 不等待
        nil,          // 参数
    )
    failOnError(err, "Failed to declare a queue")

    messages := []string{"First message", "Second message", "Third message"}

    // 在事务中发布多条消息
    for _, body := range messages {
        err = ch.Publish(
            "",     // 交换机
            q.Name, // 队列名称
            false,  // 强制性
            false,  // 立即
            amqp.Publishing{
                DeliveryMode: amqp.Persistent, // 消息持久化
                ContentType:  "text/plain",
                Body:         []byte(body),
            })
        failOnError(err, "Failed to publish a message")

        // 设置回滚条件（示例条件）
        if body == "Second message" {
            log.Println("Rollback condition met, rolling back transaction")
            err = ch.TxRollback() // 回滚事务
            failOnError(err, "Failed to rollback transaction")
            return
        }
    }

    // 提交事务
    err = ch.TxCommit()
    failOnError(err, "Failed to commit transaction")
    log.Println("Transaction committed")
}
```

这个示例首先创建了一个连接到RabbitMQ的连接，然后开启一个channel，并将这个channel设置为事务模式。接下来，声明一个队列并尝试向这个队列发送三条消息。在发送第二条消息时，我们设置了一个“回滚条件”，如果满足这个条件（在这个例子中，当消息内容是"Second message"时），则执行事务回滚操作并退出函数。如果所有消息都成功发送，且没有触发回滚条件，那么会提交事务。

请注意，这个例子中的回滚条件是硬编码的，仅用于演示如何使用RabbitMQ的事务功能。在实际应用中，你需要根据具体的业务逻辑来确定回滚条件。
