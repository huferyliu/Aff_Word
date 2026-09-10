---
title: select_shape 算子参考
slug: reference-select-shape
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 区域分析
level: 速查
date: 2026-09-10
description: 快速查询 select_shape 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
select_shape (Regions, SelectedRegions, Features, Operation, Min, Max)
```

## 算子介绍

按一个或多个区域形状特征筛选对象。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Regions | 输入 | 区域对象元组 |
| SelectedRegions | 输出 | 算子参数，具体取值见参数设置 |
| Features | 输入 | 算子参数，具体取值见参数设置 |
| Operation | 输入 | 多特征组合方式 |
| Min | 输入 | 最小值 |
| Max | 输入 | 最大值 |

**关键参数：**`Features` 指定面积、宽高、圆度等特征；`Operation` 使用 `and` 或 `or`；`Min`、`Max` 指定范围。

## 参数设置

先输出真实样本特征分布，再设置上下限。调试时分步筛选有利于判断是哪项条件拒绝目标。

## 最小示例

```halcon
select_shape (ConnectedRegions, SelectedRegions, 'area', 'and', 500, 999999)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

零件筛选、孔洞过滤、颗粒分级、缺陷面积和形状判定。

## 常见组合

根据“零件筛选、孔洞过滤、颗粒分级、缺陷面积和形状判定。”所在流程，与前后算子组合使用。

## 注意事项

面积相同不代表形状相同。应选择与物理目标和缺陷机理对应的特征。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
