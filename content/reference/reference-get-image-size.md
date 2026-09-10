---
title: get_image_size 算子参考
slug: reference-get-image-size
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 几何测量
level: 速查
date: 2026-09-10
description: 快速查询 get_image_size 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
get_image_size (Image, Width, Height)
```

## 算子介绍

获取图像宽度和高度，输出 `Width` 与 `Height`。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| Width | 输出 | 图像宽度或相关宽度 |
| Height | 输出 | 图像高度或相关高度 |

**关键参数：**输入 `Image` 可以是单张图像或图像对象元组；输出尺寸单位为像素。

## 参数设置

无需阈值设置。应把返回尺寸用于窗口创建、ROI 边界检查和测量对象创建，避免写死分辨率。

## 最小示例

```halcon
get_image_size (Image, Width, Height)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

适配不同相机分辨率、创建显示窗口、验证输入图像、生成全图 ROI。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

更换相机后，如果算法中仍有固定坐标，尺寸检查通过也可能发生 ROI 越界或位置错误。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
