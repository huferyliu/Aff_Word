---
title: clear_shape_model 算子参考
slug: reference-clear-shape-model
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 形状匹配
level: 速查
date: 2026-09-10
description: 快速查询 clear_shape_model 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
clear_shape_model (ModelID)
```

## 算子介绍

释放形状模型占用的资源。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| ModelID | 输入 | 形状模型句柄 |

**关键参数：**`ModelID` 必须是有效的模型句柄。

## 参数设置

无需调节。在产品切换、模型重建或程序退出时明确释放。

## 最小示例

```halcon
clear_shape_model (ModelID)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

长期运行程序、动态加载多个产品模型、避免句柄资源累积。

## 常见组合

根据“长期运行程序、动态加载多个产品模型、避免句柄资源累积。”所在流程，与前后算子组合使用。

## 注意事项

释放后不能继续使用该句柄。并发流程中应确保没有其他任务正在匹配。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
