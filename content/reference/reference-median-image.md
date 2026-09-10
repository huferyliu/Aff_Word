---
title: median_image 算子参考
slug: reference-median-image
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 图像处理
level: 速查
date: 2026-09-10
description: 快速查询 median_image 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
median_image (Image, ImageMedian, MaskType, Radius, Margin)
```

## 算子介绍

使用邻域中值替换当前像素，对孤立脉冲噪声具有较强抑制能力。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| ImageMedian | 输出 | 图像对象 |
| MaskType | 输入 | 算子参数，具体取值见参数设置 |
| Radius | 输入 | 圆半径或形态学结构元素半径 |
| Margin | 输入 | 算子参数，具体取值见参数设置 |

**关键参数：**`MaskType` 指定结构形状，`Radius` 决定半径，`Margin` 决定边界处理方式。

## 参数设置

点状噪声可从圆形半径 1 到 3 开始。半径不得大于需要保留的小孔、小点或细线尺度。

## 最小示例

```halcon
median_image (Image, ImageMedian, 'circle', 2, 'mirrored')
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

椒盐噪声、孤立亮点、孤立暗点、二值化前清理异常像素。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

中值滤波不是线性滤波，较大半径会明显改变细小结构形状。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
