---
title: select_shape_std 算子参考
slug: reference-select-shape-std
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形态学
level: 速查
date: 2026-09-10
description: 快速查询 select_shape_std 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
select_shape_std (Regions, SelectedRegions, Shape, Percent)
```

## 算子介绍

使用预定义的标准策略筛选区域，例如保留最大区域。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Regions | 输入 | 区域对象元组 |
| SelectedRegions | 输出 | 算子参数，具体取值见参数设置 |
| Shape | 输入 | 算子参数，具体取值见参数设置 |
| Percent | 输入 | 算子参数，具体取值见参数设置 |

**关键参数：**`Shape` 指定策略，常用 `max_area`；`Percent` 控制相对于最大区域的保留范围。

## 参数设置

只需要单一主体时可以使用 `max_area`。`Percent` 越低，越可能同时保留面积较小的区域。

## 最小示例

```halcon
select_shape_std (Regions, SelectedRegions, 'max_area', 70)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

从阈值结果中快速保留主体、去除明显小噪声、获得后续形态学处理对象。

## 常见组合

根据“从阈值结果中快速保留主体、去除明显小噪声、获得后续形态学处理对象。”所在流程，与前后算子组合使用。

## 注意事项

存在多个同等重要目标时不应使用只保留最大区域的策略。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
