---
title: close_measure 算子参考
slug: reference-close-measure
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 close_measure 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
close_measure (MeasureHandle)
```

## 算子介绍

释放一维测量对象占用的资源。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| MeasureHandle | 输入 | 一维测量对象句柄 |

**关键参数：**`MeasureHandle` 是由测量对象创建算子返回的句柄。

## 参数设置

无需调节。完成测量、图像尺寸变化或重新建立测量对象前释放旧句柄。

## 最小示例

```halcon
close_measure (MeasureHandle)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

产品切换、动态 ROI、长期运行的测量程序。

## 常见组合

根据“产品切换、动态 ROI、长期运行的测量程序。”所在流程，与前后算子组合使用。

## 注意事项

不要在循环中持续创建测量对象却不释放，也不要在释放后继续调用测量算子。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
