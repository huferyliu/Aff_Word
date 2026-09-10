---
title: select_gray 算子参考
slug: reference-select-gray
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 区域分析
level: 速查
date: 2026-09-10
description: 快速查询 select_gray 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
select_gray (Regions, Image, SelectedRegions, Features, Operation, Min, Max)
```

## 算子介绍

根据区域内部的灰度特征筛选区域。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Regions | 输入 | 区域对象元组 |
| Image | 输入 | 图像对象 |
| SelectedRegions | 输出 | 算子参数，具体取值见参数设置 |
| Features | 输入 | 算子参数，具体取值见参数设置 |
| Operation | 输入 | 多特征组合方式 |
| Min | 输入 | 最小值 |
| Max | 输入 | 最大值 |

**关键参数：**`Features` 可选择均值、最小值、最大值或方差等灰度特征，`Min` 与 `Max` 指定接受范围。

## 参数设置

在固定曝光和 ROI 条件下统计正常与异常区域分布。灰度范围应包含批次波动，不要从单张图片直接确定。

## 最小示例

```halcon
select_gray (Regions, Image, SelectedRegions, 'mean', 'and', 80, 180)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

同形状目标的亮暗分类、焊点灰度检查、表面污染筛选。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

光照变化会直接移动灰度特征分布，应与曝光监控或归一化策略配合。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
