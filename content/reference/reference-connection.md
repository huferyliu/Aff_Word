---
title: connection 算子参考
slug: reference-connection
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 connection 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
connection (Region, ConnectedRegions)
```

## 算子介绍

将区域拆分为彼此独立的连通区域对象。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Region | 输入 | 区域对象 |
| ConnectedRegions | 输出 | 算子参数，具体取值见参数设置 |

**关键参数：**没有显式数值参数。连通规则由系统的 4 邻域或 8 邻域设置决定，默认通常使用 8 邻域。

## 参数设置

点接触目标需要根据业务决定是否视为连接。改变系统邻域前应记录原设置，避免影响其他流程。

## 最小示例

```halcon
connection (Region, ConnectedRegions)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

目标计数、Blob 分析、噪声拆分、字符分割和缺陷候选分离。

## 常见组合

`threshold → connection → select_shape` 用于把阈值区域拆成可筛选目标。

## 注意事项

目标被错误连接通常源自阈值包含背景桥接，不能只依靠后续面积筛选解决。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
