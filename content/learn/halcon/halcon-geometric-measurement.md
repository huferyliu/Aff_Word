---
title: HALCON 几何测量
slug: halcon-geometric-measurement
category: HALCON
type: tutorial
tags:
  - HALCON
  - 几何测量
  - measure_pos
  - 标定
level: 中级
date: 2026-09-10
description: 使用一维测量矩形提取直边位置，并区分像素距离、标定结果和最终尺寸误差。
---

## 简介

几何测量需要稳定提取边缘位置，再将像素距离转换为物理尺寸。模板匹配负责定位工件，测量 ROI 跟随工件移动，`measure_pos` 在 ROI 内寻找与测量方向垂直的边缘。

## 创建测量对象

```halcon
get_image_size (Image, Width, Height)
gen_measure_rectangle2 (Row, Column, Phi, Length1, Length2, \
                        Width, Height, 'bilinear', MeasureHandle)
```

- `Row, Column` 是测量矩形中心。
- `Phi` 是矩形主轴方向。
- `Length1` 是主轴半长，决定搜索范围。
- `Length2` 是副轴半长，决定用于平均的宽度。

## 提取边缘

```halcon
measure_pos (Image, MeasureHandle, 1.0, 30, \
             'all', 'all', RowEdge, ColumnEdge, \
             Amplitude, Distance)
close_measure (MeasureHandle)
```

| 参数 | 作用 |
| --- | --- |
| Sigma | 灰度剖面平滑尺度 |
| Threshold | 最小边缘幅度 |
| Transition | positive、negative 或 all |
| Select | first、last、all 或 strongest |

## 过渡方向

测量方向沿矩形主轴。灰度由暗变亮是正过渡，由亮变暗是负过渡。方向设置错误时，可能找不到边缘或找到相反一侧。

## 像素距离与实际尺寸

```halcon
PixelDistance := sqrt((RowEdge[1] - RowEdge[0]) * (RowEdge[1] - RowEdge[0]) + \
                      (ColumnEdge[1] - ColumnEdge[0]) * (ColumnEdge[1] - ColumnEdge[0]))
PartWidthMM := PixelDistance * MMPerPixel
```

简单比例换算只适合近似平面、固定工作距离且畸变可忽略的场景。高精度测量应完成相机标定，并在实际测量平面验证误差。

## 常见问题

### 边缘数量不固定

ROI 内存在纹理、反光或其他结构。收窄 ROI、指定过渡方向，并提高边缘幅度阈值。

### 重复测量有波动

检查曝光、机械振动、焦点、边缘平滑尺度和亚像素定位。应连续采集同一零件统计重复性。

### 标定残差小但尺寸仍不准

标定残差只反映模型拟合。零件高度变化、安装误差、镜头温漂和错误边缘都会进入最终误差。

## 相关知识

- [HALCON 形状模板匹配](/articles/halcon-shape-matching.html)
- [HALCON 边缘检测与 XLD](/articles/halcon-edge-detection.html)
