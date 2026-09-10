---
title: opening_circle 算子参考
slug: reference-opening-circle
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 opening_circle 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
opening_circle (Region, RegionOpening, Radius)
```

## 算子介绍

先腐蚀再膨胀，去除小前景和细连接，同时尽量保持大区域尺寸。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Region | 输入 | 区域对象 |
| RegionOpening | 输出 | 区域对象 |
| Radius | 输入 | 圆半径或形态学结构元素半径 |

**关键参数：**`Radius` 决定被移除结构的尺度。

## 参数设置

半径略大于需要去除的噪声，但小于真实目标细节。使用缺陷边界样本确认不会删除有效结构。

## 最小示例

```halcon
opening_circle (Region, RegionOpening, 3.5)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

清理小亮点、去除毛刺候选、断开细桥、平滑区域外边界。

## 常见组合

通常放在分割和连通域处理之后，用于清理、补全或组合区域，再进入特征筛选。

## 注意事项

开运算不是无损去噪，窄齿、细线和小字符笔画可能被删除。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
