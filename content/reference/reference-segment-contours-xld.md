---
title: segment_contours_xld 算子参考
slug: reference-segment-contours-xld
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 边缘检测
level: 速查
date: 2026-09-10
description: 快速查询 segment_contours_xld 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
segment_contours_xld (Contours, ContoursSplit, Mode, SmoothCont, MaxLineDist1, MaxLineDist2)
```

## 算子介绍

将 XLD 轮廓分割成直线段、圆弧段或一般轮廓段。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Contours | 输入 | 算子参数，具体取值见参数设置 |
| ContoursSplit | 输出 | 算子参数，具体取值见参数设置 |
| Mode | 输入 | 处理模式 |
| SmoothCont | 输入 | 算子参数，具体取值见参数设置 |
| MaxLineDist1 | 输入 | 第一距离容差 |
| MaxLineDist2 | 输入 | 第二距离容差 |

**关键参数：**`Mode` 决定分割类型；`SmoothCont` 控制平滑；`MaxLineDist1` 与 `MaxLineDist2` 控制分割误差容忍度。

## 参数设置

从官方示例附近的小平滑值开始，逐步增加。误差阈值过小会产生过多碎片，过大会把不同几何结构合并。

## 最小示例

```halcon
segment_contours_xld (Contours, ContoursSplit, 'lines_circles', 5, 4, 2)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

直线和圆弧识别、轮廓分段、几何拟合前处理。

## 常见组合

通常与亚像素边缘提取、轮廓分割和轮廓筛选组合使用。

## 注意事项

分割参数与图像分辨率和边缘噪声有关，更换镜头后需要重新验证。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
