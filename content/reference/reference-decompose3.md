---
title: decompose3 算子参考
slug: reference-decompose3
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 图像处理
level: 速查
date: 2026-09-10
description: 快速查询 decompose3 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
decompose3 (MultiChannelImage, Image1, Image2, Image3)
```

## 算子介绍

把三通道图像拆分为三个单通道图像 `Image1`、`Image2` 和 `Image3`。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| MultiChannelImage | 输入 | 算子参数，具体取值见参数设置 |
| Image1 | 输出 | 图像对象 |
| Image2 | 输出 | 图像对象 |
| Image3 | 输出 | 图像对象 |

**关键参数：**输入必须是三通道图像。输出通道顺序取决于输入图像的通道定义，常见 RGB 图像对应 R、G、B。

## 参数设置

无需数值参数。应分别统计三个通道中目标与背景的差异，再选择最稳定的通道。

## 最小示例

```halcon
decompose3 (Image, Red, Green, Blue)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

颜色零件分割、印刷颜色检测、选择对缺陷最敏感的颜色通道。

## 常见组合

通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。

## 注意事项

通道图像共享输入数据引用，不要把通道拆分误认为颜色空间转换。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
