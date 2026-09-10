---
title: difference 算子参考
slug: reference-difference
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 边缘检测
level: 速查
date: 2026-09-10
description: 快速查询 difference 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
difference (Region, Sub, RegionDifference)
```

## 算子介绍

计算两个区域的集合差，输出属于第一个区域但不属于第二个区域的部分。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Region | 输入 | 区域对象 |
| Sub | 输入 | 算子参数，具体取值见参数设置 |
| RegionDifference | 输出 | 区域对象 |

**关键参数：**`Region` 是被减区域，`Sub` 是减去的区域，输入顺序决定结果含义。

## 参数设置

无需数值参数。使用前应叠加显示两个输入区域，确认坐标系和定义范围一致。

## 最小示例

```halcon
difference (Region, SubRegion, RegionDifference)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

缺口或凸起提取、排除已知区域、比较实际轮廓与参考轮廓。

## 常见组合

通常放在分割和连通域处理之后，用于清理、补全或组合区域，再进入特征筛选。

## 注意事项

输入顺序反转会得到完全不同的结果。定位误差也会形成大量虚假差异。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
