---
title: python反序列化字节流
date: 2024-03-01 10:35:37
tags:
 - python
 - 序列化
categories: python
---

## 基本介绍
`pickle.loads()` 是 Python 中用于从字节流中加载序列化对象的函数。`pickle` 是 Python 中的一种序列化模块，它能够将 Python 对象转换为字节流（即序列化），并在需要时将其重新加载为 Python 对象（即反序列化）。`loads()` 函数是 `pickle` 模块中用于反序列化操作的函数，它接受一个包含序列化对象的字节流，并返回相应的 Python 对象。

以下是一个简单的示例，演示如何使用 `pickle.loads()` 来反序列化一个对象：

```python
import pickle

# 定义一个字典对象
data = {'name': 'John', 'age': 30, 'city': 'New York'}

# 将对象序列化为字节流
serialized_data = pickle.dumps(data)

# 从字节流中加载对象
loaded_data = pickle.loads(serialized_data)

print(loaded_data)
```

在这个示例中，我们首先将一个字典对象 `data` 序列化为字节流 `serialized_data`，然后使用 `pickle.loads()` 函数从字节流中加载对象，并将其赋值给 `loaded_data`。最后，我们打印 `loaded_data`，结果应该与原始的 `data` 对象相同。
<!-- more -->
## 场景和使用
序列化和反序列化可用于跨语言通信。
这是[一个例子](/2024/02/28/go/go%20encoding%20glob的使用场景和实例/)
