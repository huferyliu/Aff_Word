---
title: HALCON 图像读取与显示
slug: halcon-image-io-display
category: HALCON
type: tutorial
tags:
  - HALCON
  - 图像读取
  - 图像显示
level: 初级
date: 2026-09-10
description: 掌握图像读取、尺寸与通道检查、彩色通道拆分以及 HDevelop 窗口显示的基本流程。
---

## 简介

图像读取与显示是每个 HALCON 项目的入口。工程代码不能只假设图像存在，还需要检查尺寸、通道数量、图像类型和定义域，避免后续算子接收到错误对象。

## 基本原理

HALCON 将图像作为图标对象传递。`read_image` 从文件创建图像对象，`get_image_size` 返回尺寸，`count_channels` 返回通道数。彩色图像可以通过 `decompose3` 拆分为三个单通道图像。

## 核心语法

```halcon
read_image (Image, 'part.png')
get_image_size (Image, Width, Height)
count_channels (Image, Channels)
dev_open_window (0, 0, Width, Height, 'black', WindowHandle)
dev_display (Image)
```

| 算子 | 作用 | 关键输出 |
| --- | --- | --- |
| read_image | 从文件读取图像 | Image |
| get_image_size | 获取图像宽高 | Width、Height |
| count_channels | 获取通道数量 | Channels |
| decompose3 | 拆分三通道图像 | ImageR、ImageG、ImageB |
| dev_display | 在活动图形窗口显示对象 | 无 |

## 彩色图像处理

```halcon
read_image (ColorImage, 'color_part.png')
count_channels (ColorImage, Channels)
if (Channels == 3)
    decompose3 (ColorImage, ImageR, ImageG, ImageB)
    dev_set_color ('red')
    dev_display (ImageR)
endif
```

`decompose3` 创建的通道图像引用原图通道数据，不应把它理解为三次完整复制。后续若只需要亮度信息，通常使用颜色空间转换或 `rgb1_to_gray`。

## 显示区域和轮廓

```halcon
threshold (Image, Region, 0, 100)
dev_display (Image)
dev_set_color ('green')
dev_set_draw ('margin')
dev_set_line_width (2)
dev_display (Region)
```

图像通常以填充方式显示，区域和 XLD 轮廓可以使用边缘方式叠加。显示设置只影响可视化，不会改变对象本身。

## 常见问题

### 相对路径失效

HDevelop 的当前工作目录可能与脚本所在目录不同。项目中应统一资源目录，发布前检查所有相对路径。

### 图像看起来全黑

高位深图像的灰度范围可能超出显示窗口默认范围。先用 `min_max_gray` 检查范围，再按需要缩放灰度，仅用于显示的缩放不要覆盖原始测量数据。

### 显示尺寸改变算法结果

窗口缩放不会修改图像像素。算法只处理图像对象，显示窗口只是观察工具。

## 相关知识

- [数字图像基础](/articles/digital-image-basics.html)
- [HALCON 灰度图像处理](/articles/halcon-gray-processing.html)
