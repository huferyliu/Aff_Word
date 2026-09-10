---
title: edges_sub_pix 算子参考
slug: reference-edges-sub-pix
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 几何测量
level: 速查
date: 2026-09-10
description: 快速查询 edges_sub_pix 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
edges_sub_pix (Image, Edges, Filter, Alpha, Low, High)
```

## 算子介绍

以亚像素精度提取图像边缘，输出 XLD 轮廓。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| Edges | 输出 | 算子参数，具体取值见参数设置 |
| Filter | 输入 | 边缘滤波器类型 |
| Alpha | 输入 | 算子参数，具体取值见参数设置 |
| Low | 输入 | 低阈值 |
| High | 输入 | 高阈值 |

**关键参数：**`Filter` 指定边缘方法；`Alpha` 控制平滑尺度；`Low` 和 `High` 是低、高边缘阈值。

## 参数设置

Canny 方法可从 `Alpha` 约 1 到 2 开始。先提高 `High` 保留可靠强边缘，再调低 `Low` 连接弱边缘。

## 最小示例

```halcon
edges_sub_pix (Image, Edges, 'canny', 1.2, 20, 40)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

尺寸测量、轮廓拟合、形状分析、需要亚像素位置的边缘定位。

## 常见组合

`edges_sub_pix → segment_contours_xld → select_contours_xld → fit_*_contour_xld` 用于几何轮廓分析。

## 注意事项

图像噪声、模糊和纹理会产生额外轮廓。边缘数量多不代表检测质量高。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
