---
title: threshold 算子参考
slug: reference-threshold
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 区域分析
level: 速查
date: 2026-09-10
description: 快速查询 threshold 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
threshold (Image, Region, MinGray, MaxGray)
```

## 算子介绍

提取灰度位于闭区间 `[MinGray, MaxGray]` 内的像素，输出区域。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| Region | 输出 | 区域对象 |
| MinGray | 输入 | 灰度下限 |
| MaxGray | 输入 | 灰度上限 |

**关键参数：**`MinGray` 是灰度下限，`MaxGray` 是灰度上限。暗目标通常使用较低区间，亮目标使用较高区间。

## 参数设置

先查看 ROI 内灰度直方图和多批次样本。阈值范围应覆盖正常波动，同时避免连接背景。

## 最小示例

```halcon
threshold (Image, Region, 0, 100)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

目标与背景灰度差明显、照明均匀、处理速度要求高的场景。

## 常见组合

`threshold → connection → select_shape` 是基础 Blob 分析链路。

## 注意事项

固定阈值对曝光变化敏感。扩大阈值只能提高召回，不能解决背景粘连问题。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
