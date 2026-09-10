---
title: erosion_circle 算子参考
slug: reference-erosion-circle
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形态学
level: 速查
date: 2026-09-10
description: 快速查询 erosion_circle 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
erosion_circle (Region, RegionErosion, Radius)
```

## 算子介绍

使用圆形结构元素腐蚀区域，使区域边界向内收缩。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Region | 输入 | 区域对象 |
| RegionErosion | 输出 | 区域对象 |
| Radius | 输入 | 圆半径或形态学结构元素半径 |

**关键参数：**`Radius` 是圆形结构元素半径，单位为像素。

## 参数设置

半径应小于需要保留的最细结构宽度。从 1.5 或 2.5 像素等较小尺寸开始，并换算对应物理尺度。

## 最小示例

```halcon
erosion_circle (Region, RegionErosion, 3.5)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

去除细小凸起、断开窄连接、缩小掩膜、分离轻微粘连目标。

## 常见组合

通常放在分割和连通域处理之后，用于清理、补全或组合区域，再进入特征筛选。

## 注意事项

腐蚀会同时缩小正常目标，小孔附近和细线结构可能完全消失。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
