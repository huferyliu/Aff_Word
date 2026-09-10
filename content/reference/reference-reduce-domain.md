---
title: reduce_domain 算子参考
slug: reference-reduce-domain
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形状匹配
level: 速查
date: 2026-09-10
description: 快速查询 reduce_domain 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
reduce_domain (Image, Region, ImageReduced)
```

## 算子介绍

使用区域缩小图像的定义域，后续支持定义域的算子只处理指定范围。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输入 | 图像对象 |
| Region | 输入 | 区域对象 |
| ImageReduced | 输出 | 图像对象 |

**关键参数：**`Image` 是原图，`Region` 是限制区域，输出 `ImageReduced` 保留原图像素但定义域变小。

## 参数设置

区域应覆盖检测需要的上下文。过小会裁掉滤波窗口或边缘，过大则降低速度并增加干扰。

## 最小示例

```halcon
reduce_domain (Image, ROI, ImageReduced)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

局部阈值、局部模板创建、限制特征计算、降低处理时间。

## 常见组合

根据“局部阈值、局部模板创建、限制特征计算、降低处理时间。”所在流程，与前后算子组合使用。

## 注意事项

`reduce_domain` 不是图像裁剪，图像矩阵尺寸通常没有改变。需要改变图像尺寸时应使用相应裁剪算子。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
