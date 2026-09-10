---
title: count_channels 算子参考
slug: reference-count-channels
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 图像处理
level: 速查
date: 2026-09-10
description: 快速查询 count_channels 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
count_channels (MultiChannelImage, Channels)
```

## 算子介绍

返回图像的通道数量。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| MultiChannelImage | 输入 | 算子参数，具体取值见参数设置 |
| Channels | 输出 | 图像通道数量 |

**关键参数：**输入 `MultiChannelImage`，输出 `Channels`。灰度图通常为 1，RGB 彩色图通常为 3。

## 参数设置

无需调节参数。可以根据通道数量选择 `rgb1_to_gray`、`decompose3` 或直接进入灰度处理。

## 最小示例

```halcon
count_channels (Image, Channels)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

处理来源不统一的图片、图像格式验证、颜色检测流程分支。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

不要对单通道图像调用仅适用于三通道图像的转换算子。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
