---
title: sort_region 算子参考
slug: reference-sort-region
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 sort_region 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
sort_region (Regions, SortedRegions, SortMode, Order, RowOrCol)
```

## 算子介绍

按位置关系对区域对象排序，生成符合阅读顺序的字符区域。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Regions | 输入 | 区域对象元组 |
| SortedRegions | 输出 | 算子参数，具体取值见参数设置 |
| SortMode | 输入 | 区域排序模式 |
| Order | 输入 | 升序或降序 |
| RowOrCol | 输入 | 按行或列作为主要排序方向 |

**关键参数：**`SortMode` 指定排序方式；`Order` 指定升序或降序；`RowOrCol` 指定以行或列为主要方向。

## 参数设置

单行字符通常按列方向排序。多行文本应先分组行，再在每行内部排序。

## 最小示例

```halcon
sort_region (Characters, SortedCharacters, 'character', 'true', 'column')
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

OCR 字符顺序、零件阵列排序、检测结果与位置对应。

## 常见组合

通常与字符分割、排序、分类器加载和资源释放组合使用。

## 注意事项

字符倾斜、上下波动或多行间距接近时，简单排序可能交叉，需要先校正姿态或分行。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
