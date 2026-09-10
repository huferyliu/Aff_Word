---
title: gen_rectangle1 算子参考
slug: reference-gen-rectangle1
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形状匹配
level: 速查
date: 2026-09-10
description: 快速查询 gen_rectangle1 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
gen_rectangle1 (Rectangle, Row1, Column1, Row2, Column2)
```

## 算子介绍

根据左上角和右下角坐标生成轴对齐矩形区域。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Rectangle | 输出 | 算子参数，具体取值见参数设置 |
| Row1 | 输入 | 左上角行坐标 |
| Column1 | 输入 | 左上角列坐标 |
| Row2 | 输入 | 右下角行坐标 |
| Column2 | 输入 | 右下角列坐标 |

**关键参数：**`Row1`、`Column1` 是左上角坐标，`Row2`、`Column2` 是右下角坐标。

## 参数设置

坐标应位于图像范围内。ROI 应覆盖目标变化范围，同时尽量排除无关背景。

## 最小示例

```halcon
gen_rectangle1 (ROI, 100, 120, 420, 680)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

固定工位 ROI、模板区域选择、局部缺陷检测、裁剪搜索范围。

## 常见组合

根据“固定工位 ROI、模板区域选择、局部缺陷检测、裁剪搜索范围。”所在流程，与前后算子组合使用。

## 注意事项

目标存在旋转或位置漂移时，固定矩形可能裁掉目标，应结合定位结果变换 ROI。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
