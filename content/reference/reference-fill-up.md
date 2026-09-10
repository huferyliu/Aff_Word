---
title: fill_up 算子参考
slug: reference-fill-up
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 边缘检测
level: 速查
date: 2026-09-10
description: 快速查询 fill_up 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
fill_up (Region, RegionFillUp)
```

## 算子介绍

填充区域内部完全被前景包围的孔洞。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Region | 输入 | 区域对象 |
| RegionFillUp | 输出 | 区域对象 |

**关键参数：**输入与输出均为区域，没有尺寸阈值参数。

## 参数设置

无需调节。需要按孔洞大小选择时，应使用带形状条件的孔洞处理流程，而不是无条件填充。

## 最小示例

```halcon
fill_up (Region, RegionFillUp)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

获得实心外形、计算外轮廓面积、消除目标内部无意义孔洞。

## 常见组合

通常放在分割和连通域处理之后，用于清理、补全或组合区域，再进入特征筛选。

## 注意事项

孔洞可能是产品真实结构或缺陷特征，填充前必须明确检测目标。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
