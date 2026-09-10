---
title: dilation_circle 算子参考
slug: reference-dilation-circle
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 几何测量
level: 速查
date: 2026-09-10
description: 快速查询 dilation_circle 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
dilation_circle (Region, RegionDilation, Radius)
```

## 算子介绍

使用圆形结构元素膨胀区域，使区域边界向外扩张。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Region | 输入 | 区域对象 |
| RegionDilation | 输出 | 区域对象 |
| Radius | 输入 | 圆半径或形态学结构元素半径 |

**关键参数：**`Radius` 决定扩张距离和连接能力。

## 参数设置

根据需要填补的间距选择半径。两个目标间距小于有效结构尺寸时可能被连接。

## 最小示例

```halcon
dilation_circle (Region, RegionDilation, 3.5)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

扩展掩膜、连接邻近区域、补偿分割区域偏小、为安全 ROI 留边。

## 常见组合

通常放在分割和连通域处理之后，用于清理、补全或组合区域，再进入特征筛选。

## 注意事项

膨胀后的区域不能代表原始真实尺寸，不应直接用于精密测量。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
