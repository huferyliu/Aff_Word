---
title: create_shape_model 算子参考
slug: reference-create-shape-model
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形状匹配
level: 速查
date: 2026-09-10
description: 快速查询 create_shape_model 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
create_shape_model (Template, NumLevels, AngleStart, AngleExtent, AngleStep, Optimization, Metric, Contrast, MinContrast, ModelID)
```

## 算子介绍

从模板图像的边缘结构创建形状匹配模型。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Template | 输入 | 算子参数，具体取值见参数设置 |
| NumLevels | 输入 | 图像金字塔层数 |
| AngleStart | 输入 | 搜索起始角 |
| AngleExtent | 输入 | 角度搜索范围 |
| AngleStep | 输入 | 角度步长 |
| Optimization | 输入 | 模型优化方式 |
| Metric | 输入 | 边缘极性度量 |
| Contrast | 输入 | 模型边缘对比度 |
| MinContrast | 输入 | 最低对比度 |
| ModelID | 输出 | 形状模型句柄 |

**关键参数：**`NumLevels` 控制金字塔层级；`AngleStart`、`AngleExtent`、`AngleStep` 控制角度范围；`Metric` 控制极性；`Contrast` 与 `MinContrast` 控制模型边缘。

## 参数设置

模板 ROI 只保留稳定结构。角度范围越小通常越快；对比度阈值应排除噪声边缘但保留关键轮廓。

## 最小示例

```halcon
create_shape_model (Template, 'auto', rad(-20), rad(40), 'auto', 'auto', 'use_polarity', 'auto', 'auto', ModelID)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

零件定位、姿态获取、跟随 ROI、抓取引导和后续检测坐标对齐。

## 常见组合

`create_shape_model → find_shape_model → vector_angle_to_rigid → affine_trans_region` 用于定位和跟随 ROI。

## 注意事项

模板包含背景或反光会降低跨批次稳定性。对称目标可能产生多个等价角度。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
