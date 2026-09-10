---
title: dev_display 算子参考
slug: reference-dev-display
category: HALCON 算子
type: reference
listed: false
tags:
  - HALCON
  - 算子参考
  - 边缘检测
level: 速查
date: 2026-09-10
description: 快速查询 dev_display 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

```halcon
dev_display (Object)
```

## 算子介绍

在当前活动的 HDevelop 图形窗口显示图像、区域或 XLD 对象。

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
| Object | 输入 | 算子参数，具体取值见参数设置 |

**关键参数：**输入为要显示的图标对象，显示颜色、填充方式和线宽由 `dev_set_color`、`dev_set_draw`、`dev_set_line_width` 等开发算子控制。

## 参数设置

图像先显示，区域或轮廓后显示。区域边界观察通常使用 `dev_set_draw ('margin')`。

## 最小示例

```halcon
dev_display (Image)
```

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

HDevelop 调试、观察中间结果、参数对比和教学演示。

## 常见组合

根据“HDevelop 调试、观察中间结果、参数对比和教学演示。”所在流程，与前后算子组合使用。

## 注意事项

`dev_` 系列属于 HDevelop 开发环境操作，不是导出到生产语言后的核心算法接口。

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
