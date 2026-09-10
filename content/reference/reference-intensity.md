---
title: intensity 算子参考
slug: reference-intensity
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形态学
level: 速查
date: 2026-09-10
description: 快速查询 intensity 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
intensity (Regions, Image, Mean, Deviation)
```

## 算子介绍

计算区域覆盖图像位置的平均灰度和灰度偏差。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Regions | 输入 | 区域对象元组 |
| Image | 输入 | 图像对象 |
| Mean | 输出 | 平均灰度 |
| Deviation | 输出 | 灰度标准差 |

**关键参数：**`Regions` 指定统计区域，`Image` 提供灰度，输出 `Mean` 与 `Deviation`。

## 参数设置

统计前确认区域没有包含大量背景。可对正常样本建立均值和偏差范围。

## 最小示例

```halcon
intensity (Region, Image, Mean, Deviation)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

表面亮暗检查、曝光监控、同形状区域分类、均匀性评价。

## 常见组合

根据“表面亮暗检查、曝光监控、同形状区域分类、均匀性评价。”所在流程，与前后算子组合使用。

## 注意事项

区域面积太小或包含高光时，均值容易波动，应结合面积和极端值检查。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
