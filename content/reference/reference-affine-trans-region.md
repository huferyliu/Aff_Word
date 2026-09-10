---
title: affine_trans_region 算子参考
slug: reference-affine-trans-region
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形状匹配
level: 速查
date: 2026-09-10
description: 快速查询 affine_trans_region 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
affine_trans_region (Region, RegionAffineTrans, HomMat2D, Interpolate)
```

## 算子介绍

使用二维齐次变换矩阵变换区域。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Region | 输入 | 区域对象 |
| RegionAffineTrans | 输出 | 区域对象 |
| HomMat2D | 输入 | 二维齐次变换矩阵 |
| Interpolate | 输入 | 插值方式 |

**关键参数：**`Region` 是输入区域，`HomMat2D` 是变换矩阵，`Interpolate` 指定区域变换方式。

## 参数设置

区域通常使用最近邻方式。变换后应叠加显示，确认 ROI 与目标位置一致。

## 最小示例

```halcon
affine_trans_region (Region, RegionTrans, HomMat2D, 'nearest_neighbor')
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

模板匹配后的 ROI 跟随、区域旋转和平移、基准坐标转换。

## 常见组合

根据“模板匹配后的 ROI 跟随、区域旋转和平移、基准坐标转换。”所在流程，与前后算子组合使用。

## 注意事项

图像、区域和点需要使用各自对应的变换算子，不要混用对象类型。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
