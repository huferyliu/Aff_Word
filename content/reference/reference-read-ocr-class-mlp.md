---
title: read_ocr_class_mlp 算子参考
slug: reference-read-ocr-class-mlp
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 read_ocr_class_mlp 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
read_ocr_class_mlp (FileName, OCRHandle)
```

## 算子介绍

从文件读取已经训练好的 MLP OCR 分类器，返回 OCR 句柄。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| FileName | 输入 | 文件路径或文件名 |
| OCRHandle | 输出 | OCR 分类器句柄 |

**关键参数：**`FileName` 是分类器文件路径，输出 `OCRHandle` 用于后续分类。

## 参数设置

选择与字符集、字体类型、字符极性和图像分辨率相匹配的分类器。生产项目应使用真实样本验证通用分类器。

## 最小示例

```halcon
read_ocr_class_mlp ('Industrial_0-9A-Z_NoRej.omc', OCRHandle)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

离线训练、在线加载分类器、数字和字母识别。

## 常见组合

`read_ocr_class_mlp → sort_region → do_ocr_multi_class_mlp → clear_ocr_class_mlp` 用于 OCR 分类。

## 注意事项

加载成功只证明文件有效，不代表分类器适合当前字体和成像条件。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
