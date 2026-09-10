---
title: gauss_filter 算子参考
slug: reference-gauss-filter
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形状匹配
level: 速查
date: 2026-09-10
description: 快速查询 gauss_filter 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
gauss_filter (Image, ImageGauss, Size)
```

## 算子介绍

使用高斯核平滑图像，比简单均值滤波具有更自然的空间权重。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| ImageGauss | 输出 | 图像对象 |
| Size | 输入 | 算子参数，具体取值见参数设置 |

**关键参数：**`Size` 决定滤波模板大小，必须使用算子允许的离散尺寸。

## 参数设置

从较小尺寸开始，逐步增加并检查边缘位置和小缺陷完整度。噪声尺度越大，通常需要更大滤波尺度。

## 最小示例

```halcon
gauss_filter (Image, ImageGauss, 1.5)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

边缘检测前降噪、连续随机噪声抑制、尺度空间处理。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

大尺寸滤波增加计算量，并会改变边缘梯度幅度，后续边缘阈值需要重新评估。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
