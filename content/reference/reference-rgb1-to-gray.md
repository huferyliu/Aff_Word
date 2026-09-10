---
title: rgb1_to_gray 算子参考
slug: reference-rgb1-to-gray
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 rgb1_to_gray 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
rgb1_to_gray (RGBImage, GrayImage)
```

## 算子介绍

将 RGB 图像转换为单通道灰度图。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| RGBImage | 输入 | 算子参数，具体取值见参数设置 |
| GrayImage | 输出 | 输出灰度图像 |

**关键参数：**输入 `RGBImage`，输出 `GrayImage`，没有需要手动调整的权重参数。

## 参数设置

当颜色本身是主要判定特征时，先比较单通道或转换到合适颜色空间，不要直接丢弃颜色信息。

## 最小示例

```halcon
rgb1_to_gray (Image, GrayImage)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

灰度阈值、边缘检测、模板匹配、OCR 前处理。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

两种颜色可能转换成相近灰度，导致彩色图中明显的差异在灰度图中消失。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
