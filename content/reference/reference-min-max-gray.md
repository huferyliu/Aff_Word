---
title: min_max_gray 算子参考
slug: reference-min-max-gray
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 区域分析
level: 速查
date: 2026-09-10
description: 快速查询 min_max_gray 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
min_max_gray (Regions, Image, Percent, Min, Max, Range)
```

## 算子介绍

统计指定区域内图像的最小灰度、最大灰度和灰度范围。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Regions | 输入 | 区域对象元组 |
| Image | 输入 | 图像对象 |
| Percent | 输入 | 算子参数，具体取值见参数设置 |
| Min | 输出 | 最小值 |
| Max | 输出 | 最大值 |
| Range | 输出 | 最大值与最小值之差 |

**关键参数：**`Regions` 决定统计范围；`Image` 提供灰度；`Percent` 用于抑制极端灰度值影响。

## 参数设置

无明显离群点时可从 `Percent = 0` 开始；存在孤立亮点或暗点时逐步提高百分比，并观察有效范围是否稳定。

## 最小示例

```halcon
min_max_gray (Region, Image, 0, Min, Max, Range)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

曝光检查、位深检查、显示范围估计、动态计算灰度缩放系数。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

整图统计可能被背景主导，应优先在有效 ROI 内计算。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
