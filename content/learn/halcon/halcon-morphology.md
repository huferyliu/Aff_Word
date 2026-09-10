---
title: HALCON 形态学处理
slug: halcon-morphology
category: HALCON
type: tutorial
tags:
  - HALCON
  - 形态学
  - 腐蚀
  - 膨胀
level: 中级
date: 2026-09-10
description: 使用腐蚀、膨胀、开闭运算和孔洞填充修正区域，并理解结构元素尺寸的工程含义。
---

## 简介

形态学通过结构元素改变区域形状。它适合去除小噪声、断开细连接、填补缺口和修正边界，但也可能同时改变真实缺陷。

## 基本运算

| 运算 | 典型作用 | HALCON 算子 |
| --- | --- | --- |
| 腐蚀 | 收缩区域，去除细小凸起 | erosion_circle |
| 膨胀 | 扩张区域，连接近邻 | dilation_circle |
| 开运算 | 先腐蚀后膨胀，去除小前景 | opening_circle |
| 闭运算 | 先膨胀后腐蚀，填补小缺口 | closing_circle |
| 填孔 | 填充区域内部孔洞 | fill_up |

## 基础示例

```halcon
threshold (Image, Region, 0, 96)
connection (Region, ConnectedRegions)
select_shape_std (ConnectedRegions, MainRegion, 'max_area', 70)
closing_circle (MainRegion, RegionClosed, 3.5)
opening_circle (RegionClosed, RegionClean, 1.5)
fill_up (RegionClean, RegionFilled)
```

## 结构元素尺寸

圆形结构元素的半径以像素表示。应先根据成像分辨率把物理缺陷尺寸换算成像素，再确定半径。例如每像素代表 0.05 mm，半径 3.5 像素大约影响 0.175 mm 尺度的边界结构。

## 缺陷提取

可以将原区域与形态学修正后的参考区域做差，提取凸起或缺口候选。

```halcon
opening_circle (MainRegion, RegionReference, 4.5)
difference (MainRegion, RegionReference, Protrusions)
connection (Protrusions, Candidates)
select_shape (Candidates, Defects, 'area', 'and', 12, 500)
```

![形态学清理示意](/assets/images/gear-threshold.png "清理后的齿轮区域")

## 常见问题

### 正常边缘被删除

结构元素大于正常结构的局部宽度。减少半径，或使用更符合目标方向的结构元素。

### 闭运算连接了两个独立目标

两个目标间距小于结构元素有效尺寸。先分割单个 ROI，或降低闭运算半径。

### 参数换相机后失效

像素分辨率改变后，原来的像素半径不再代表相同物理尺寸。部署配置中应保存像素到毫米的换算关系。

## 相关知识

- [区域与连通域](/articles/halcon-regions-connectivity.html)
- [齿轮边缘毛刺去除](/articles/gear-burr-removal.html)
