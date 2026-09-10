---
title: gen_measure_rectangle2 算子参考
slug: reference-gen-measure-rectangle2
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 几何测量
level: 速查
date: 2026-09-10
description: 快速查询 gen_measure_rectangle2 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
gen_measure_rectangle2 (Row, Column, Phi, Length1, Length2, Width, Height, Interpolation, MeasureHandle)
```

## 算子介绍

创建旋转矩形测量对象，用于沿矩形主轴方向搜索灰度边缘。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Row | 输入 | 中心或结果的行坐标 |
| Column | 输入 | 中心或结果的列坐标 |
| Phi | 输入 | 方向角，单位为弧度 |
| Length1 | 输入 | 第一主轴半长 |
| Length2 | 输入 | 第二主轴半长 |
| Width | 输入 | 图像宽度或相关宽度 |
| Height | 输入 | 图像高度或相关高度 |
| Interpolation | 输入 | 算子参数，具体取值见参数设置 |
| MeasureHandle | 输出 | 一维测量对象句柄 |

**关键参数：**`Row`、`Column` 是中心；`Phi` 是方向；`Length1` 是搜索方向半长；`Length2` 是平均方向半长；`Interpolation` 指定插值。

## 参数设置

`Length1` 覆盖所有可能边缘位置，`Length2` 在抑制噪声和保留局部变化之间平衡。精密测量通常使用双线性插值。

## 最小示例

```halcon
gen_measure_rectangle2 (Row, Column, Phi, Length1, Length2, Width, Height, 'bilinear', MeasureHandle)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

宽度、间距、边缘位置、零件尺寸和装配间隙测量。

## 常见组合

`gen_measure_rectangle2 → measure_pos → close_measure` 是一维测量的完整句柄生命周期。

## 注意事项

测量对象与图像尺寸关联，更换分辨率后需要重新创建。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
