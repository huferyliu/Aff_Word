---
title: scale_image 算子参考
slug: reference-scale-image
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 几何测量
level: 速查
date: 2026-09-10
description: 快速查询 scale_image 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
scale_image (Image, ImageScaled, Mult, Add)
```

## 算子介绍

根据 `gNew = g * Mult + Add` 对灰度进行线性变换。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| ImageScaled | 输出 | 图像对象 |
| Mult | 输入 | 灰度乘法系数 |
| Add | 输入 | 灰度偏移量 |

**关键参数：**`Mult` 控制对比度，`Add` 控制整体亮度偏移。

## 参数设置

`Mult > 1` 增强灰度差，`0 < Mult < 1` 压缩灰度差。先根据输入最小值和最大值计算目标范围，避免大量像素被截断到 0 或类型上限。

## 最小示例

```halcon
scale_image (Image, ImageScaled, 1.2, -20)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

归一化显示、增强目标与背景差异、统一不同批次的灰度范围。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

饱和截断会永久丢失当前输出图像中的灰度细节，测量和纹理分析应保留原图。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
