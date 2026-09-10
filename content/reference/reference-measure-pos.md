---
title: measure_pos 算子参考
slug: reference-measure-pos
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 几何测量
level: 速查
date: 2026-09-10
description: 快速查询 measure_pos 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
measure_pos (Image, MeasureHandle, Sigma, Threshold, Transition, Select, RowEdge, ColumnEdge, Amplitude, Distance)
```

## 算子介绍

在测量对象中提取与主轴垂直的直边位置、幅度和边缘间距离。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| MeasureHandle | 输入 | 一维测量对象句柄 |
| Sigma | 输入 | 高斯平滑尺度 |
| Threshold | 输入 | 最小响应或边缘幅度阈值 |
| Transition | 输入 | 边缘极性 |
| Select | 输入 | 边缘选择策略 |
| RowEdge | 输出 | 边缘行坐标 |
| ColumnEdge | 输出 | 边缘列坐标 |
| Amplitude | 输出 | 边缘幅度 |
| Distance | 输出 | 相邻边缘距离 |

**关键参数：**`Sigma` 控制剖面平滑；`Threshold` 是最小边缘幅度；`Transition` 指定正、负或全部过渡；`Select` 指定第一条、最后一条、全部或最强边缘。

## 参数设置

先观察灰度剖面确定极性。提高 `Threshold` 排除弱纹理，增大 `Sigma` 抑制噪声，但会降低窄边缘定位能力。

## 最小示例

```halcon
measure_pos (Image, MeasureHandle, 1.0, 20, 'all', 'all', RowEdge, ColumnEdge, Amplitude, Distance)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

高精度边缘位置、宽度、间距、直径和台阶测量。

## 常见组合

`gen_measure_rectangle2 → measure_pos → close_measure` 用于提取边缘并及时释放测量对象。

## 注意事项

提取的距离首先是像素距离。转换到毫米前需要标定或经过验证的像素比例。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
