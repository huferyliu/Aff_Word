---
title: dyn_threshold 算子参考
slug: reference-dyn-threshold
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 区域分析
level: 速查
date: 2026-09-10
description: 快速查询 dyn_threshold 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
dyn_threshold (OrigImage, ThresholdImage, RegionDynThresh, Offset, LightDark)
```

## 算子介绍

比较原图与局部参考图的灰度差，在背景缓慢变化时进行局部分割。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| OrigImage | 输入 | 算子参数，具体取值见参数设置 |
| ThresholdImage | 输入 | 算子参数，具体取值见参数设置 |
| RegionDynThresh | 输出 | 区域对象 |
| Offset | 输入 | 局部阈值偏移量 |
| LightDark | 输入 | 选择亮目标、暗目标或不等关系 |

**关键参数：**`OrigImage` 是原图，`ThresholdImage` 是平滑参考图，`Offset` 是最小灰度差，`LightDark` 指定提取亮区域、暗区域或两者。

## 参数设置

先用 `mean_image` 等方法生成参考图。平滑窗口应明显大于缺陷尺寸；`Offset` 从噪声波动上限附近开始调节。

## 最小示例

```halcon
dyn_threshold (Image, ImageMean, Region, 12, 'dark')
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

照明不均匀背景上的划痕、污点、印刷缺陷和表面亮暗异常。

## 常见组合

`mean_image → dyn_threshold → connection → select_shape` 适合局部亮度不均。

## 注意事项

参考窗口过小会跟随缺陷变化，导致缺陷被当作背景消除。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
