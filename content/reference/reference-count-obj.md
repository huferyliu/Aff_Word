---
title: count_obj 算子参考
slug: reference-count-obj
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - OCR
level: 速查
date: 2026-09-10
description: 快速查询 count_obj 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
count_obj (Objects, Number)
```

## 算子介绍

统计图标对象元组中的对象数量。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Objects | 输入 | 算子参数，具体取值见参数设置 |
| Number | 输出 | 对象数量 |

**关键参数：**输入可以是区域、图像或 XLD 对象元组，输出 `Number` 是对象数量。

## 参数设置

无需调节。应明确统计发生在 `connection`、筛选或排序的哪一步。

## 最小示例

```halcon
count_obj (Objects, Number)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

零件计数、字符数量校验、检测结果状态判断。

## 常见组合

根据“零件计数、字符数量校验、检测结果状态判断。”所在流程，与前后算子组合使用。

## 注意事项

一个区域对象内部可以包含多个不连通部分。需要统计连通目标时，应先执行 `connection`。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
