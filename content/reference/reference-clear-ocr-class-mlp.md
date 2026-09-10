---
title: clear_ocr_class_mlp 算子参考
slug: reference-clear-ocr-class-mlp
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 clear_ocr_class_mlp 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
clear_ocr_class_mlp (OCRHandle)
```

## 算子介绍

释放 MLP OCR 分类器资源。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| OCRHandle | 输入 | OCR 分类器句柄 |

**关键参数：**`OCRHandle` 必须是有效分类器句柄。

## 参数设置

无需调节。更换分类器或退出程序时释放。

## 最小示例

```halcon
clear_ocr_class_mlp (OCRHandle)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

产品切换、动态字符集、长期运行系统的资源管理。

## 常见组合

通常与字符分割、排序、分类器加载和资源释放组合使用。

## 注意事项

释放后不能继续识别。并发使用同一分类器时，需要先结束相关任务。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
