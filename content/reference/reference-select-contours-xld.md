---
title: select_contours_xld 算子参考
slug: reference-select-contours-xld
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 边缘检测
level: 速查
date: 2026-09-10
description: 快速查询 select_contours_xld 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
select_contours_xld (Contours, SelectedContours, Feature, Min1, Max1, Min2, Max2)
```

## 算子介绍

根据长度、方向、位置或其他 XLD 特征筛选轮廓。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Contours | 输入 | 算子参数，具体取值见参数设置 |
| SelectedContours | 输出 | 算子参数，具体取值见参数设置 |
| Feature | 输入 | 用于筛选的特征名称 |
| Min1 | 输入 | 算子参数，具体取值见参数设置 |
| Max1 | 输入 | 算子参数，具体取值见参数设置 |
| Min2 | 输入 | 算子参数，具体取值见参数设置 |
| Max2 | 输入 | 算子参数，具体取值见参数设置 |

**关键参数：**`Feature` 指定筛选特征，`Min1`、`Max1` 和第二组范围参数定义接受区间。

## 参数设置

轮廓长度筛选应参考真实目标的最短有效边缘。先统计特征，再确定范围。

## 最小示例

```halcon
select_contours_xld (Contours, SelectedContours, 'contour_length', 50, 999999, -0.5, 0.5)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

去除短噪声轮廓、保留指定方向边缘、减少拟合候选数量。

## 常见组合

通常与亚像素边缘提取、轮廓分割和轮廓筛选组合使用。

## 注意事项

真实小缺陷可能也是短轮廓，不能在缺陷检测前无条件删除。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
