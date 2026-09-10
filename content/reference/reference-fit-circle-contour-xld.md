---
title: fit_circle_contour_xld 算子参考
slug: reference-fit-circle-contour-xld
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形状匹配
level: 速查
date: 2026-09-10
description: 快速查询 fit_circle_contour_xld 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
fit_circle_contour_xld (Contours, Algorithm, MaxNumPoints, MaxClosureDist, ClippingEndPoints, Iterations, ClippingFactor, Row, Column, Radius, StartPhi, EndPhi, PointOrder)
```

## 算子介绍

对 XLD 轮廓拟合圆，输出圆心、半径、起止角度和点顺序。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Contours | 输入 | 算子参数，具体取值见参数设置 |
| Algorithm | 输入 | 拟合算法 |
| MaxNumPoints | 输入 | 参与拟合的最大点数 |
| MaxClosureDist | 输入 | 算子参数，具体取值见参数设置 |
| ClippingEndPoints | 输入 | 轮廓端点裁剪点数 |
| Iterations | 输入 | 鲁棒拟合迭代次数 |
| ClippingFactor | 输入 | 离群点裁剪因子 |
| Row | 输出 | 中心或结果的行坐标 |
| Column | 输出 | 中心或结果的列坐标 |
| Radius | 输出 | 圆半径或形态学结构元素半径 |
| StartPhi | 输出 | 圆弧起始角 |
| EndPhi | 输出 | 圆弧结束角 |
| PointOrder | 输出 | 轮廓点方向 |

**关键参数：**`Algorithm` 决定拟合策略，迭代次数、裁剪因子和点间距参数影响稳健性与速度。

## 参数设置

尽量使用覆盖足够角度的圆弧。圆弧过短时圆心和半径对噪声非常敏感。

## 最小示例

```halcon
fit_circle_contour_xld (Contour, 'atukey', -1, 2, 0, 5, 2, Row, Column, Radius, StartPhi, EndPhi, PointOrder)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

孔径、圆心、圆环、圆弧和同心度检测。

## 常见组合

通常与亚像素边缘提取、轮廓分割和轮廓筛选组合使用。

## 注意事项

拟合残差小不代表实际尺寸准确，还需要相机标定和真实量具验证。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
