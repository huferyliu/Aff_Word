---
title: HALCON 区域与连通域
slug: halcon-regions-connectivity
category: HALCON
type: tutorial
tags:
  - HALCON
  - 区域
  - 连通域
  - select_shape
level: 初级
date: 2026-09-10
description: 理解 Region 对象、4 与 8 邻域、连通域拆分和基于形状特征的目标筛选。
---

## 简介

阈值分割通常得到一个包含多个目标和噪声的区域。Blob 分析前需要使用 `connection` 拆分连通部分，再根据面积、宽高、圆度等特征筛选。

## Region 对象

区域表示满足条件的像素集合，不保存这些像素的灰度值。图像提供灰度信息，区域提供空间范围，两者在测量灰度特征时会同时使用。

## 连通性

4 邻域只连接上下左右像素，8 邻域还连接对角像素。HALCON 的 `connection` 默认使用 8 邻域，可通过系统参数调整。

```halcon
set_system ('neighborhood', 8)
threshold (Image, Region, 0, 96)
connection (Region, ConnectedRegions)
count_obj (ConnectedRegions, Number)
```

## 形状筛选

```halcon
select_shape (ConnectedRegions, SelectedRegions, \
              ['area', 'circularity'], 'and', \
              [5000, 0.65], [999999, 1.0])
```

| 常用特征 | 用途 |
| --- | --- |
| area | 排除小噪声或过大背景 |
| width、height | 约束包围盒尺寸 |
| circularity | 筛选近圆形目标 |
| rectangularity | 筛选近矩形目标 |
| anisometry | 区分细长与紧凑区域 |

## 获取区域位置

```halcon
area_center (SelectedRegions, Area, Row, Column)
smallest_rectangle2 (SelectedRegions, RowRect, ColumnRect, Phi, Length1, Length2)
```

当输入包含多个区域时，输出控制参数通常是元组。后续循环需要保证对象索引与元组索引对应。

## 运行效果

![阈值、连通域和目标筛选流程](/assets/images/gear-process.png "从候选区域到筛选结果")

## 常见问题

### 两个目标被当成一个区域

目标像素之间仍存在连接。检查阈值是否包含背景桥接，也可以使用开运算断开细小连接。

### 一个目标被拆成多个区域

目标内部存在灰度缺口。先改善成像，再考虑闭运算或区域合并。

### 只用面积筛选误检

不同形状可能面积相近。组合宽高、圆度、矩形度或灰度特征，避免单一阈值承担全部判定。

## 相关知识

- [HALCON 形态学处理](/articles/halcon-morphology.html)
- [HALCON Blob 分析](/articles/halcon-blob-analysis.html)
