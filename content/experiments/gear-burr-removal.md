---
title: 齿轮边缘毛刺去除
slug: gear-burr-removal
category: HALCON 实验
type: experiment
tags:
  - HALCON
  - 机器视觉
  - 形态学
  - 边缘检测
level: 中级
date: 2026-09-10
description: 记录齿轮边缘分割、形态学清理和缺陷区域提取的完整实验过程。
---

## 实验目标

从高对比度齿轮图像中提取主体轮廓，移除孤立噪声，并标记超出理想轮廓的边缘毛刺区域。

![齿轮处理流程](/assets/images/gear-process.png "原图、阈值区域与最终边缘结果")

## 原始图片

背景均匀但齿尖附近存在少量反光。齿轮主体明显比背景更暗，适合先使用灰度阈值获取候选区域。

## 处理流程

1. 灰度化并使用固定阈值分割。
2. 对区域执行连通域分析，只保留最大主体。
3. 使用闭运算填补齿根处的小断裂。
4. 将实际轮廓与平滑后的参考轮廓做差。
5. 按面积和长度筛选疑似毛刺。

## 最终代码

```halcon
read_image (Image, 'gear')
rgb1_to_gray (Image, GrayImage)
threshold (GrayImage, Region, 0, 96)
connection (Region, ConnectedRegions)
select_shape_std (ConnectedRegions, Gear, 'max_area', 70)
closing_circle (Gear, GearClosed, 3.5)
opening_circle (GearClosed, GearClean, 1.5)
difference (Gear, GearClean, BurrCandidates)
select_shape (BurrCandidates, Burrs, 'area', 'and', 12, 500)
```

## 实验结论

形态学处理可以稳定移除孤立噪声，但结构元素半径过大会同时削弱正常齿尖。半径需要根据成像分辨率换算，不能直接复制到不同镜头配置。

## 遇到的问题

当局部反光穿过阈值范围时，齿尖会产生缺口。实际部署应增加曝光监控，并保留一组边界样本做回归测试。
