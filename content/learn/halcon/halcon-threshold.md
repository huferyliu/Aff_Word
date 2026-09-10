---
title: HALCON threshold 阈值分割
slug: halcon-threshold
category: HALCON
type: tutorial
tags:
  - HALCON
  - 图像处理
  - 阈值分割
level: 初级
date: 2026-09-10
description: 使用 threshold 算子按灰度范围提取区域，并理解阈值选择对结果的影响。
---

## 简介

`threshold` 是 HALCON 中最常用的区域分割算子之一。它选择灰度值位于指定范围内的像素，并生成一个区域对象。

![齿轮原始图像](/assets/images/gear-original.png "原始图像：目标与背景存在明显灰度差")

## 基本原理

对输入图像中的每个像素进行判断。当灰度值满足 `MinGray <= Gray <= MaxGray` 时，该像素进入输出区域。

## 语法

```halcon
threshold (Image, Region, MinGray, MaxGray)
```

## 参数说明

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Image | 输入图像 | 待处理的单通道图像 |
| Region | 输出区域 | 满足灰度范围的像素集合 |
| MinGray | 输入控制 | 最小灰度阈值 |
| MaxGray | 输入控制 | 最大灰度阈值 |

## 基础示例

```halcon
read_image (Image, 'gear')
rgb1_to_gray (Image, GrayImage)
threshold (GrayImage, DarkRegion, 0, 92)
connection (DarkRegion, ConnectedRegions)
select_shape (ConnectedRegions, GearRegion, 'area', 'and', 12000, 999999)
```

![阈值分割结果](/assets/images/gear-threshold.png "阈值分割后得到候选区域")

## 运行效果

当光照稳定且目标与背景灰度差明显时，单一阈值可以快速得到可靠区域。若目标内部出现孔洞或边缘断裂，可继续使用 `fill_up`、`opening_circle` 或 `closing_circle` 修正。

## 常见问题

### 阈值太低

目标区域会被切碎，细节丢失。先查看灰度直方图，再逐步扩大范围。

### 阈值太高

背景噪声会与目标粘连。可以结合连通域和面积筛选，而不是只依赖一次阈值。

## 实际应用

适合字符前景提取、零件轮廓分割、亮斑或暗斑检测，以及为后续 Blob 分析生成候选区域。

## 相关知识

- [threshold 算子参考](/articles/reference-threshold.html)
- [connection 算子参考](/articles/reference-connection.html)
