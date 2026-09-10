---
title: do_ocr_multi_class_mlp 算子参考
slug: reference-do-ocr-multi-class-mlp
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 do_ocr_multi_class_mlp 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
do_ocr_multi_class_mlp (Character, Image, OCRHandle, Class, Confidence)
```

## 算子介绍

使用 MLP 分类器批量识别多个字符区域，输出类别与置信度元组。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Character | 输入 | 算子参数，具体取值见参数设置 |
| Image | 输入 | 图像对象 |
| OCRHandle | 输入 | OCR 分类器句柄 |
| Class | 输出 | 识别类别 |
| Confidence | 输出 | 识别置信度 |

**关键参数：**`Character` 是已分割并排序的字符区域，`Image` 提供灰度，`OCRHandle` 是分类器句柄。

## 参数设置

字符区域应包含完整笔画并尽量排除相邻字符。置信度阈值需要通过验证集确定，并结合字符数量和格式规则。

## 最小示例

```halcon
do_ocr_multi_class_mlp (Characters, Image, OCRHandle, Class, Confidence)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

批量数字、字母、日期、批次号和工业喷码识别。

## 常见组合

通常与字符分割、排序、分类器加载和资源释放组合使用。

## 注意事项

高置信度也可能识别错误。训练数据不匹配或字符分割错误时，分类器仍会选择最接近的类别。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
