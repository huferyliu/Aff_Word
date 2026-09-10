---
title: vector_angle_to_rigid 算子参考
slug: reference-vector-angle-to-rigid
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形状匹配
level: 速查
date: 2026-09-10
description: 快速查询 vector_angle_to_rigid 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
vector_angle_to_rigid (Row1, Column1, Angle1, Row2, Column2, Angle2, HomMat2D)
```

## 算子介绍

根据两个点和两个方向建立二维刚性变换矩阵。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Row1 | 输入 | 左上角行坐标 |
| Column1 | 输入 | 左上角列坐标 |
| Angle1 | 输入 | 算子参数，具体取值见参数设置 |
| Row2 | 输入 | 右下角行坐标 |
| Column2 | 输入 | 右下角列坐标 |
| Angle2 | 输入 | 算子参数，具体取值见参数设置 |
| HomMat2D | 输出 | 二维齐次变换矩阵 |

**关键参数：**前一组行、列、角度表示源姿态，后一组表示目标姿态，输出 `HomMat2D`。

## 参数设置

HALCON 使用行、列顺序。角度单位为弧度，通常使用 `rad()` 转换。

## 最小示例

```halcon
vector_angle_to_rigid (RowRef, ColRef, AngleRef, Row, Column, Angle, HomMat2D)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

将基准 ROI 变换到当前匹配位置、坐标对齐、跟随检测。

## 常见组合

根据“将基准 ROI 变换到当前匹配位置、坐标对齐、跟随检测。”所在流程，与前后算子组合使用。

## 注意事项

行列顺序、角度正方向和源目标姿态写反会导致明显偏移或旋转错误。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
