---
title: HALCON 边缘检测与 XLD
slug: halcon-edge-detection
category: HALCON
type: tutorial
tags:
  - HALCON
  - 边缘检测
  - XLD
  - 亚像素
level: 中级
date: 2026-09-10
description: 使用 edges_sub_pix 提取亚像素轮廓，并通过轮廓分割、筛选和拟合获得稳定几何特征。
---

## 简介

区域分割回答“哪些像素属于目标”，边缘检测回答“灰度在哪里快速变化”。需要精确定位、尺寸测量或轮廓匹配时，XLD 亚像素轮廓通常比像素区域边界更合适。

## 亚像素边缘

```halcon
edges_sub_pix (Image, Edges, 'canny', 1.2, 20, 40)
```

| 参数 | 作用 |
| --- | --- |
| Filter | 边缘滤波方法，例如 canny |
| Alpha | 平滑尺度，越大越抑制噪声 |
| Low | 低阈值，用于边缘连接 |
| High | 高阈值，用于确定强边缘 |

低阈值过小会保留大量噪声，高阈值过大会丢失弱边缘。`Alpha` 与阈值必须结合真实边缘宽度调节。

## 分割轮廓

```halcon
segment_contours_xld (Edges, ContoursSplit, \
                      'lines_circles', 5, 4, 2)
select_contours_xld (ContoursSplit, SelectedContours, \
                     'contour_length', 30, 999999, -0.5, 0.5)
```

轮廓分割可以把复杂 XLD 拆成直线段和圆弧段。筛选短轮廓能减少后续拟合的干扰，但可能同时删除真实小缺陷。

## 直线与圆拟合

```halcon
fit_line_contour_xld (SelectedContours, 'tukey', -1, 0, 5, 2, \
                      RowBegin, ColBegin, RowEnd, ColEnd, Nr, Nc, Dist)
fit_circle_contour_xld (SelectedContours, 'atukey', -1, 2, 0, 3, 2, \
                        Row, Column, Radius, StartPhi, EndPhi, PointOrder)
```

鲁棒拟合可以降低离群点影响，但不能修复完全错误的边缘。先限制 ROI、改善光照和选择正确极性，再调拟合参数。

## 常见问题

### 出现双边缘

模糊边界或宽亮带可能产生两条灰度变化。减小 ROI、明确过渡方向，或在测量阶段选择第一条、最后一条或最强边缘。

### 轮廓断裂

弱边缘低于阈值，或反光使梯度方向变化。检查原始灰度剖面，不要直接用形态学强行连接亚像素轮廓。

### 边缘很多但测量不稳定

检测到边缘不等于找到正确边缘。需要位置、方向、长度和几何关系约束。

## 相关知识

- [HALCON 几何测量](/articles/halcon-geometric-measurement.html)
- [HALCON 形状模板匹配](/articles/halcon-shape-matching.html)
