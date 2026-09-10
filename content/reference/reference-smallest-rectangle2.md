---
title: smallest_rectangle2 算子参考
slug: reference-smallest-rectangle2
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 区域分析
level: 速查
date: 2026-09-10
description: 快速查询 smallest_rectangle2 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
smallest_rectangle2 (Regions, Row, Column, Phi, Length1, Length2)
```

## 算子介绍

计算包围区域的最小方向矩形。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Regions | 输入 | 区域对象元组 |
| Row | 输出 | 中心或结果的行坐标 |
| Column | 输出 | 中心或结果的列坐标 |
| Phi | 输出 | 方向角，单位为弧度 |
| Length1 | 输出 | 第一主轴半长 |
| Length2 | 输出 | 第二主轴半长 |

**关键参数：**输出中心 `Row`、`Column`、方向 `Phi`、两个半边长 `Length1` 和 `Length2`。

## 参数设置

无需调节。可由 `2 * Length1` 和 `2 * Length2` 得到矩形两个方向的近似尺寸。

## 最小示例

```halcon
smallest_rectangle2 (Region, Row, Column, Phi, Length1, Length2)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

零件方向估计、旋转矩形尺寸、建立跟随 ROI、筛选细长目标。

## 常见组合

根据“零件方向估计、旋转矩形尺寸、建立跟随 ROI、筛选细长目标。”所在流程，与前后算子组合使用。

## 注意事项

近方形或高度对称区域的方向可能不稳定，不能把 `Phi` 当作唯一姿态依据。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
