---
title: HALCON 灰度图像处理
slug: halcon-gray-processing
category: HALCON
type: tutorial
tags:
  - HALCON
  - 灰度图
  - 图像增强
  - 滤波
level: 初级
date: 2026-09-10
description: 理解灰度转换、范围检查、线性变换、平滑和锐化，并用后续检测指标评价增强效果。
---

## 简介

灰度处理用于减少噪声、增强目标与背景差异，并为阈值、边缘或纹理分析提供更稳定的输入。增强的目标不是让图片更好看，而是提高后续检测的一致性。

## 灰度转换

```halcon
read_image (ColorImage, 'part_color.png')
rgb1_to_gray (ColorImage, GrayImage)
min_max_gray (GrayImage, GrayImage, 0, MinGray, MaxGray, Range)
```

`rgb1_to_gray` 将 RGB 图像转换为单通道灰度图。若目标信息主要体现在某个颜色通道，直接灰度化可能削弱差异，此时应先拆分通道并比较。

## 线性灰度变换

`scale_image` 根据 `gNew = g * Mult + Add` 调整灰度，并将超出图像类型范围的结果截断。

```halcon
scale_image (GrayImage, ImageScaled, 1.35, -20)
```

| 参数 | 含义 | 风险 |
| --- | --- | --- |
| Mult | 对比度缩放系数 | 过大导致高光和暗部饱和 |
| Add | 整体灰度偏移 | 可能把有效区间移出范围 |

## 平滑与降噪

```halcon
mean_image (GrayImage, ImageMean, 5, 5)
gauss_filter (GrayImage, ImageGauss, 5)
median_image (GrayImage, ImageMedian, 'circle', 3, 'mirrored')
```

- 均值滤波速度快，但容易模糊边缘。
- 高斯滤波适合连续随机噪声，尺度越大，细节损失越明显。
- 中值滤波对孤立亮点和暗点有效，并能较好保留阶跃边缘。

## 锐化与局部增强

```halcon
emphasize (GrayImage, ImageEmphasized, 7, 7, 1.0)
```

锐化会同时增强噪声。应在真实边界样本上比较分割完整度、边缘位置波动或识别置信度，而不是只观察显示效果。

## 推荐实验方法

1. 保存未经处理的原图作为基线。
2. 每次只改变一个滤波参数。
3. 使用相同阈值或边缘参数比较后续结果。
4. 同时检查正常样本和最差样本。
5. 记录运行时间，避免在整幅大图上使用不必要的大模板。

## 常见问题

### 滤波后小缺陷消失

滤波尺度大于缺陷尺寸。缩小模板，或只在背景估计阶段使用强平滑。

### 对比度提高但阈值更不稳定

线性变换可能让部分像素饱和。检查变换前后的灰度范围，并保留未缩放图像用于测量。

## 相关知识

- [HALCON threshold 阈值分割](/articles/halcon-threshold.html)
- [HALCON 边缘检测与 XLD](/articles/halcon-edge-detection.html)
