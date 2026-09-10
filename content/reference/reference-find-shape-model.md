---
title: find_shape_model 算子参考
slug: reference-find-shape-model
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形状匹配
level: 速查
date: 2026-09-10
description: 快速查询 find_shape_model 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
find_shape_model (Image, ModelID, AngleStart, AngleExtent, MinScore, NumMatches, MaxOverlap, SubPixel, NumLevels, Greediness, Row, Column, Angle, Score)
```

## 算子介绍

在搜索图像中查找形状模型，输出位置、角度和匹配分数。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| ModelID | 输入 | 形状模型句柄 |
| AngleStart | 输入 | 搜索起始角 |
| AngleExtent | 输入 | 角度搜索范围 |
| MinScore | 输入 | 最低匹配分数 |
| NumMatches | 输入 | 最大匹配数量 |
| MaxOverlap | 输入 | 匹配结果最大重叠率 |
| SubPixel | 输入 | 亚像素精化方法 |
| NumLevels | 输入 | 图像金字塔层数 |
| Greediness | 输入 | 搜索贪婪度 |
| Row | 输出 | 中心或结果的行坐标 |
| Column | 输出 | 中心或结果的列坐标 |
| Angle | 输出 | 匹配得到的角度 |
| Score | 输出 | 匹配分数 |

**关键参数：**`MinScore` 是最低分数；`NumMatches` 是最大匹配数量；`MaxOverlap` 控制重叠；`SubPixel` 控制精化；`Greediness` 控制搜索速度与完整性。

## 参数设置

`MinScore` 从较严格值开始，再根据漏检样本降低。`Greediness` 越高通常越快，但必须用边界样本确认不会漏检。

## 最小示例

```halcon
find_shape_model (Image, ModelID, rad(-20), rad(40), 0.6, 1, 0.5, 'least_squares', 0, 0.9, Row, Column, Angle, Score)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

工件定位、多目标查找、旋转目标检测、检测 ROI 跟随。

## 常见组合

`find_shape_model → vector_angle_to_rigid → affine_trans_region` 用于把基准检测区域对齐到当前工件。

## 注意事项

高分不等于坐标精度满足测量要求，应使用已知位置样本检查重复定位误差。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
