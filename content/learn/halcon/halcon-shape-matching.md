---
title: HALCON 形状模板匹配
slug: halcon-shape-matching
category: HALCON
type: tutorial
tags:
  - HALCON
  - 模板匹配
  - 形状匹配
  - 定位
level: 中级
date: 2026-09-10
description: 从模板区域准备到 create_shape_model 和 find_shape_model，建立可验证的零件定位流程。
---

## 简介

形状模板匹配根据边缘结构寻找目标的位置与角度，适合亮度有变化但轮廓相对稳定的零件定位。模板质量、角度范围和对称性会直接影响速度与唯一性。

## 创建模板

```halcon
read_image (TemplateImage, 'template.png')
gen_rectangle1 (ModelROI, 120, 180, 420, 520)
reduce_domain (TemplateImage, ModelROI, TemplateReduced)
create_shape_model (TemplateReduced, 'auto', rad(-20), rad(40), \
                    'auto', 'auto', 'use_polarity', \
                    'auto', 'auto', ModelID)
```

模板 ROI 应只包含稳定结构，避免夹带边框、文字、反光或其他产品。`use_polarity` 要求目标边缘明暗方向与模板一致；如果极性可能反转，需要选择合适的度量方式并验证误检风险。

## 搜索模板

```halcon
find_shape_model (SearchImage, ModelID, rad(-20), rad(40), \
                  0.6, 1, 0.5, 'least_squares', \
                  0, 0.9, Row, Column, Angle, Score)
```

| 参数 | 含义 | 调整方向 |
| --- | --- | --- |
| MinScore | 最低匹配分数 | 降低会增加召回和误检 |
| NumMatches | 返回数量 | 0 表示返回全部满足条件的匹配 |
| MaxOverlap | 匹配间最大重叠 | 多目标紧邻时需要验证 |
| SubPixel | 亚像素精化方式 | 提高精度但增加计算量 |
| Greediness | 搜索贪婪程度 | 越高通常越快，但可能漏检 |

## 建立跟随坐标系

```halcon
vector_angle_to_rigid (0, 0, 0, Row, Column, Angle, HomMat2D)
affine_trans_region (InspectionROI, ROIAligned, HomMat2D, 'nearest_neighbor')
```

实际项目通常先匹配定位，再把检测 ROI 变换到当前目标位置，而不是对整幅图像执行所有检测。

## 释放模型

```halcon
clear_shape_model (ModelID)
```

模型句柄属于需要管理的资源。离线创建的模型可以保存并在运行时读取，产品切换时应明确释放旧模型。

## 常见问题

### 匹配到对称的错误角度

模板结构存在旋转对称。增加非对称稳定特征，或结合后续检测消除姿态歧义。

### 速度过慢

缩小搜索 ROI、收紧角度范围、检查金字塔层级，并避免模板包含大量无效边缘。

### 分数高但定位偏移

模板原点或 ROI 中的主结构与实际测量基准不一致。应通过已知位置样本验证坐标输出，而不是只观察分数。

## 相关知识

- [HALCON 边缘检测与 XLD](/articles/halcon-edge-detection.html)
- [HALCON 几何测量](/articles/halcon-geometric-measurement.html)
