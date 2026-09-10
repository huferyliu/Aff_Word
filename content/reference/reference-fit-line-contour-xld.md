---
title: fit_line_contour_xld 算子参考
slug: reference-fit-line-contour-xld
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 几何测量
level: 速查
date: 2026-09-10
description: 快速查询 fit_line_contour_xld 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
fit_line_contour_xld (Contours, Algorithm, MaxNumPoints, ClippingEndPoints, Iterations, ClippingFactor, RowBegin, ColBegin, RowEnd, ColEnd, Nr, Nc, Dist)
```

## 算子介绍

对 XLD 轮廓拟合直线，输出起点、终点、法向量和距离参数。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Contours | 输入 | 算子参数，具体取值见参数设置 |
| Algorithm | 输入 | 拟合算法 |
| MaxNumPoints | 输入 | 参与拟合的最大点数 |
| ClippingEndPoints | 输入 | 轮廓端点裁剪点数 |
| Iterations | 输入 | 鲁棒拟合迭代次数 |
| ClippingFactor | 输入 | 离群点裁剪因子 |
| RowBegin | 输出 | 拟合线起点行坐标 |
| ColBegin | 输出 | 拟合线起点列坐标 |
| RowEnd | 输出 | 拟合线终点行坐标 |
| ColEnd | 输出 | 拟合线终点列坐标 |
| Nr | 输出 | 直线法向量行分量 |
| Nc | 输出 | 直线法向量列分量 |
| Dist | 输出 | 直线到原点的距离参数 |

**关键参数：**`Algorithm` 指定拟合方法；裁剪迭代和阈值参数控制离群点剔除。

## 参数设置

边缘含少量离群点时使用鲁棒方法，例如 Tukey 类方法。拟合前应先限制轮廓长度和方向。

## 最小示例

```halcon
fit_line_contour_xld (Contour, 'tukey', -1, 0, 5, 2, RowBegin, ColBegin, RowEnd, ColEnd, Nr, Nc, Dist)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

边距、夹角、平行度、直线位置和矩形边缘测量。

## 常见组合

通常与亚像素边缘提取、轮廓分割和轮廓筛选组合使用。

## 注意事项

鲁棒拟合只能降低少量离群点影响，无法修复选错轮廓或严重弯曲的边缘。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
