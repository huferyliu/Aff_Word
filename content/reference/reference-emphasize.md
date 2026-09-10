---
title: emphasize 算子参考
slug: reference-emphasize
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 emphasize 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
emphasize (Image, ImageEmphasize, MaskWidth, MaskHeight, Factor)
```

## 算子介绍

通过局部均值与原图差异增强图像细节和边缘。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| ImageEmphasize | 输出 | 图像对象 |
| MaskWidth | 输入 | 滤波窗口宽度 |
| MaskHeight | 输入 | 滤波窗口高度 |
| Factor | 输入 | 算子参数，具体取值见参数设置 |

**关键参数：**`MaskWidth`、`MaskHeight` 决定局部背景尺度，`Factor` 决定增强强度。

## 参数设置

窗口应大于要增强的局部细节。`Factor` 从较小值开始，使用后续分割或测量结果评价，而不是只看视觉对比度。

## 最小示例

```halcon
emphasize (Image, ImageEmphasized, 15, 15, 1.5)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

字符笔画增强、低对比边缘增强、细小纹理突出。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

噪声也会被增强，应先确认噪声来源，并在最差样本上检查误检。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
