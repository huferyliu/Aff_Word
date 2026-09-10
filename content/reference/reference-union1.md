---
title: union1 算子参考
slug: reference-union1
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 union1 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
union1 (Region, RegionUnion)
```

## 算子介绍

把一个区域对象元组中的所有区域合并成一个区域对象。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Region | 输入 | 区域对象 |
| RegionUnion | 输出 | 区域对象 |

**关键参数：**输入 `Region` 可以包含多个区域对象，输出 `RegionUnion` 为合并结果。

## 参数设置

无需调节。合并前确认是否还需要保留单个对象身份和排序信息。

## 最小示例

```halcon
union1 (Regions, RegionUnion)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

生成整体掩膜、合并字符区域、统一执行膨胀或外接形状计算。

## 常见组合

通常放在分割和连通域处理之后，用于清理、补全或组合区域，再进入特征筛选。

## 注意事项

合并后对象数量信息丢失，需要单体特征时应保留原区域对象元组。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
