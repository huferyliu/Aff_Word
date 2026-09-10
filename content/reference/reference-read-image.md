---
title: read_image 算子参考
slug: reference-read-image
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 图像处理
level: 速查
date: 2026-09-10
description: 快速查询 read_image 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
read_image (Image, FileName)
```

## 算子介绍

从一个或多个文件读取图像，生成 HALCON 图像对象。支持常见工业图像格式和 HALCON 支持的文件格式。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Image | 输出 | 图像对象 |
| FileName | 输入 | 文件路径或文件名 |

**关键参数：**`FileName` 是文件路径或路径元组。相对路径以当前工作目录为基础；读取序列时可以传入多个文件名。

## 参数设置

项目中建议统一图像目录并检查扩展名。调试阶段可以使用绝对路径确认资源无误，部署时再切换为受控的相对路径。

## 最小示例

```halcon
read_image (Image, 'sample.png')
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

离线算法开发、样本回放、回归测试、读取相机保存的原始图像。

## 常见组合

`read_image → get_image_size → count_channels` 用于输入检查。

## 注意事项

文件能打开不代表图像类型、通道和位深符合后续算子要求，读取后应检查尺寸、通道和灰度范围。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
