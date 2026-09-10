---
title: closing_circle 算子参考
slug: reference-closing-circle
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形态学
level: 速查
date: 2026-09-10
description: 快速查询 closing_circle 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
closing_circle (Region, RegionClosing, Radius)
```

## 算子介绍

先膨胀再腐蚀，填补小缺口和窄缝，并连接距离较近的区域。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Region | 输入 | 区域对象 |
| RegionClosing | 输出 | 区域对象 |
| Radius | 输入 | 圆半径或形态学结构元素半径 |

**关键参数：**`Radius` 决定能够闭合的缺口或间隙尺度。

## 参数设置

根据需要修复的最大缺口选择，同时检查相邻目标是否被错误连接。

## 最小示例

```halcon
closing_circle (Region, RegionClosing, 3.5)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

修补分割断裂、连接目标内部近邻区域、平滑凹陷边界。

## 常见组合

通常放在分割和连通域处理之后，用于清理、补全或组合区域，再进入特征筛选。

## 注意事项

闭运算会掩盖真实缺口缺陷。若缺口本身是检测目标，不应在判定前直接闭合。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
