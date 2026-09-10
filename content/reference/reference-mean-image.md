---
title: mean_image 算子参考
slug: reference-mean-image
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 边缘检测
level: 速查
date: 2026-09-10
description: 快速查询 mean_image 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
mean_image (Image, ImageMean, MaskWidth, MaskHeight)
```

## 算子介绍

使用矩形均值滤波器平滑图像。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| ImageMean | 输出 | 图像对象 |
| MaskWidth | 输入 | 滤波窗口宽度 |
| MaskHeight | 输入 | 滤波窗口高度 |

**关键参数：**`MaskWidth` 和 `MaskHeight` 决定滤波窗口尺寸。

## 参数设置

从 3×3 或 5×5 开始。窗口应小于需要保留的最小缺陷宽度；条纹噪声可使用非正方形窗口，但必须验证方向性影响。

## 最小示例

```halcon
mean_image (Image, ImageMean, 9, 9)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

抑制随机噪声、估计局部背景、为动态阈值生成平滑参考图。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

窗口越大，边缘越模糊，小目标越容易消失。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
