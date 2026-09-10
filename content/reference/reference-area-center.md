---
title: area_center 算子参考
slug: reference-area-center
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 区域分析
level: 速查
date: 2026-09-10
description: 快速查询 area_center 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
area_center (Regions, Area, Row, Column)
```

## 算子介绍

计算区域面积和重心坐标。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Regions | 输入 | 区域对象元组 |
| Area | 输出 | 区域面积 |
| Row | 输出 | 中心或结果的行坐标 |
| Column | 输出 | 中心或结果的列坐标 |

**关键参数：**输入区域可以包含多个对象，输出 `Area`、`Row`、`Column` 为对应元组。

## 参数设置

无需调节。重心适合表示整体位置，但对缺口、突出和非对称变化敏感。

## 最小示例

```halcon
area_center (Region, Area, Row, Column)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

区域定位、面积判定、对象排序、显示标注和结果输出。

## 常见组合

根据“区域定位、面积判定、对象排序、显示标注和结果输出。”所在流程，与前后算子组合使用。

## 注意事项

筛选或排序区域后必须重新计算特征，避免对象与旧元组错位。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
