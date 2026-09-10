---
title: Python 列表的常用操作
slug: python-lists
category: Python
type: tutorial
tags:
  - Python
  - 数据结构
level: 入门
date: 2026-09-08
description: 掌握列表创建、索引、遍历、筛选和常见的可变对象注意事项。
---

## 简介

列表是 Python 中最常用的有序可变容器，适合保存一组需要增删或排序的数据。

## 基础示例

```python
scores = [86, 92, 75, 98]
passed = [score for score in scores if score >= 80]
average = sum(scores) / len(scores)
print(passed, average)
```

## 常见问题

不要使用 `matrix = [[0] * 3] * 3` 创建需要独立修改的二维列表，因为每一行会引用同一个内部列表。使用列表推导式创建独立行。

```python
matrix = [[0] * 3 for _ in range(3)]
```
