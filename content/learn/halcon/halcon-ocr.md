---
title: HALCON OCR 字符识别
slug: halcon-ocr
category: HALCON
type: tutorial
tags:
  - HALCON
  - OCR
  - 字符识别
  - MLP
level: 中级
date: 2026-09-10
description: 建立从字符区域分割、排序、分类器加载到置信度判定的 HALCON OCR 流程。
---

## 简介

OCR 项目通常分为字符定位、字符分割、字符排序、分类识别和结果校验。分类器只是最后一步，前面的成像和分割决定了输入字符是否完整且一致。

## 字符区域分割

```halcon
read_image (Image, 'printed_code.png')
rgb1_to_gray (Image, GrayImage)
threshold (GrayImage, TextRegion, 0, 110)
connection (TextRegion, Characters)
select_shape (Characters, CharacterCandidates, \
              ['height', 'width'], 'and', \
              [22, 8], [70, 55])
sort_region (CharacterCandidates, SortedCharacters, \
             'character', 'true', 'row')
```

字符粘连需要改善成像或使用形态学分离；字符断裂则可能需要区域合并。排序必须符合实际版式，单行、双行和环形字符不能使用同一策略。

## 加载分类器

```halcon
read_ocr_class_mlp ('Industrial_0-9A-Z_NoRej.omc', OCRHandle)
```

分类器文件应与字体类型、字符极性和字符尺寸相匹配。通用分类器适合快速验证，正式项目需要用真实生产样本评估。

## 批量识别

```halcon
do_ocr_multi_class_mlp (SortedCharacters, GrayImage, \
                        OCRHandle, Class, Confidence)
ResultText := sum(Class)
clear_ocr_class_mlp (OCRHandle)
```

`Class` 和 `Confidence` 是与字符区域对应的元组。输出字符串前应检查字符数量、允许字符集和每个字符的置信度。

## 结果校验

```halcon
MinConfidence := min(Confidence)
if (|Class| != ExpectedLength or MinConfidence < 0.75)
    ResultStatus := 'NG'
else
    ResultStatus := 'OK'
endif
```

还可以加入格式规则，例如前两位必须是字母、后六位必须是数字。规则校验不能提升分类器能力，但能阻止低质量结果进入业务系统。

## 常见问题

### 字符区域顺序错误

检查 `sort_region` 的模式、方向和行列布局。多行文本应先按行分组，再在每行内部排序。

### 置信度很高但识别错误

分类器只在候选类别中选择最相似结果。训练数据缺少真实字体或字符区域裁切错误时，也可能自信地输出错误类别。

### 现场识别率下降

重点比较光照、打印质量、焦点、字符高度和分割结果，不要只调整置信度阈值。

## 相关知识

- [HALCON 灰度图像处理](/articles/halcon-gray-processing.html)
- [HALCON Blob 分析](/articles/halcon-blob-analysis.html)
