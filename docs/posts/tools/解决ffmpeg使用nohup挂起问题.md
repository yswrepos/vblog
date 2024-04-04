---
title: 解决ffmpeg使用nohup挂起问题
date: 2024-02-26 16:51:26
tags:
 - ffmpeg
categories: ffmpeg
---


ffmpeg 默认使用stdin交互，当使用nohup后台启动后，由于没有了输入交互，所以ffmpeg选择了挂起等待，
解决方案有两个：

## 指定`-nostdin`选项

```sh
nohup ffmpeg -nostdin -i "xxx.index.m3u8" -c copy -bsf:a aac_adtstoasc output.mp4 > output.log 2>&1 & echo $! > output.pid
```



## 重定向输入

```sh
nohup ffmpeg -loglevel warning error -i "xxx.m3u8" -c copy -bsf:a aac_adtstoasc output.mp4 > output.log 2>&1 < /dev/null & echo $! > output.pid
```

<!-- more -->

## 命令解释

- -i "xxx": 这里-i标志指定输入文件，"xxx"应该替换为你的M3U8文件的实际URL。
- -c copy: 这个选项指示FFmpeg复制原始数据流，不重新编码。这样做可以更快地处理文件，同时避免质量损失。
- -bsf:a aac_adtstoasc: 这是一个比特流过滤器(bitstream filter)，用于将音频从ADTS容器转换为MPEG-4 Audio Layer。这对于某些使用AAC音频的HLS流非常重要，以确保音频能够在MP4容器中正确播放。
output.mp4: 指定输出文件的名称和格式。你可以根据需要更改output.mp4为其他文件名。


## ffmepg的日志分级

FFmpeg提供了不同的日志级别，以控制命令行输出的详细程度。这些日志级别可以帮助用户在需要时获取更多信息，或者减少输出以便于查看关键信息。下面是FFmpeg支持的主要日志级别，从最详细到最少信息：

1. **`quiet`**: 安静模式，不输出任何日志信息。

2. **`panic`**: 仅输出非常严重的错误信息，通常是那些会导致程序立即终止的错误。

3. **`fatal`**: 输出致命错误信息，这些错误通常是阻止程序正常进行所必须处理的。

4. **`error`**: 输出错误信息，包括非致命错误，但是可能会影响操作的正常完成。

5. **`warning`**: 输出警告信息，指示可能的问题，但不一定会阻止程序的正常执行。

6. **`info`**: 输出信息性消息，这是默认的日志级别，提供进度报告、调试信息等。

7. **`verbose`**: 输出详细信息，比info级别更详细，用于调试问题时。

8. **`debug`**: 输出调试信息，包括很低级别的信息，对开发者或调试问题很有用。

9. **`trace`**: 输出非常详细的跟踪信息，是所有级别中最详细的，用于深入调试。

使用方式示例：

```sh
ffmpeg -loglevel error -i input.mp4 output.mp4
```

在这个例子中，`-loglevel error`指示FFmpeg仅输出错误级别的日志信息。

选择适当的日志级别可以帮助你更有效地使用FFmpeg，无论是调试复杂的问题还是简单地执行转换任务而不希望被冗余信息干扰。