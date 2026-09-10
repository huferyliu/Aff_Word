---
title: HALCON Blob 分析
slug: halcon-blob-analysis
category: HALCON
type: tutorial
tags:
  - HALCON
  - Blob分析
  - 连通域
  - 特征筛选
level: 中级
date: 2026-09-10
description: 建立从分割、连通域、特征计算到规则判定的完整 Blob 分析流程。
---

## 简介

Blob 分析不是单个算子，而是一条以区域为核心的处理链：分割候选像素、拆分连通区域、计算特征、筛选目标并输出统计结果。

## 标准流程

```halcon
threshold (Image, Region, 0, 105)
opening_circle (Region, RegionOpened, 2.5)
connection (RegionOpened, ConnectedRegions)
select_shape (ConnectedRegions, Parts, \
              ['area', 'rectangularity'], 'and', \
              [2500, 0.72], [18000, 1.0])
area_center (Parts, Area, Row, Column)
count_obj (Parts, Count)
```

## 特征分类

| 类型 | 常用特征 | 适用问题 |
| --- | --- | --- |
| 尺寸 | area、width、height | 大小是否合格 |
| 形状 | circularity、rectangularity | 外形是否接近目标 |
| 姿态 | row、column、orientation | 位置与角度 |
| 紧凑度 | compactness、anisometry | 是否细长或破碎 |
| 灰度 | mean、deviation | 区域内部明暗是否异常 |

## 灰度特征

区域形状相同但表面亮度不同，可以结合图像计算灰度特征。

```halcon
intensity (Parts, Image, Mean, Deviation)
select_gray (Parts, Image, BrightParts, 'mean', 'and', 120, 220)
```

## 多条件判定

不要把所有条件塞进一次 `select_shape` 后失去可解释性。调试阶段可以分步筛选并显示每一步数量。

```halcon
select_shape (ConnectedRegions, AreaOK, 'area', 'and', 2500, 18000)
select_shape (AreaOK, ShapeOK, 'circularity', 'and', 0.78, 1.0)
select_gray (ShapeOK, Image, FinalParts, 'mean', 'and', 80, 190)
```

## 常见问题

### 区域数量忽多忽少

优先检查阈值和成像，而不是反复调整面积范围。输入区域不稳定时，后续特征无法补救。

### 元组与对象索引错位

对区域排序、筛选或拼接后，应重新计算特征。不要继续使用筛选前的面积或中心点元组。

### 正常样本被边界值拒绝

规格阈值应来自样本统计和工程公差，不应只根据一两张理想图设置。

## 实际应用

Blob 分析适合计数、孔洞检测、装配完整性、颗粒尺寸、焊点面积和印刷缺损等目标与背景可分离的任务。

## 相关知识

- [区域与连通域](/articles/halcon-regions-connectivity.html)
- [HALCON threshold 阈值分割](/articles/halcon-threshold.html)
