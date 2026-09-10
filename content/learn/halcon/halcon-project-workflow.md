---
title: HALCON 工业视觉项目完整流程
slug: halcon-project-workflow
category: HALCON / 机器视觉
type: tutorial
tags:
  - HALCON
  - 综合案例
  - 工程实践
  - 回归测试
level: 综合
date: 2026-09-10
description: 将成像、定位、检测、测量、判定和异常处理组织成可维护的工业视觉项目。
---

## 简介

完整项目不是把多个算子连接起来就结束。稳定系统需要明确需求、控制成像、组织坐标系、保存失败样本，并让算法结果可以解释和回归。

## 第一步 定义验收指标

在写算法前确定：

- 需要检测、定位、测量还是识别。
- 最小缺陷尺寸和允许尺寸误差。
- 节拍、视野、工作距离和产品变化范围。
- 漏检、误检和不确定结果如何处理。
- 需要保存哪些原图、参数和结果。

## 第二步 建立稳定成像

先用最差样本验证光源、镜头、相机和触发。算法开发应保留原始图像，不要只保存经过增强或压缩的截图。

## 第三步 定位与坐标对齐

```halcon
find_shape_model (Image, ModelID, rad(-15), rad(30), \
                  0.65, 1, 0.5, 'least_squares', \
                  0, 0.9, Row, Column, Angle, Score)
vector_angle_to_rigid (0, 0, 0, Row, Column, Angle, HomMat2D)
affine_trans_region (BaseInspectionROI, CurrentROI, \
                     HomMat2D, 'nearest_neighbor')
```

定位和检测应分离。匹配失败时不要继续使用上一次坐标，否则会在错误位置输出看似合理的结果。

## 第四步 检测与测量

```halcon
reduce_domain (Image, CurrentROI, ImageReduced)
threshold (ImageReduced, CandidateRegion, 0, 96)
connection (CandidateRegion, ConnectedRegions)
select_shape (ConnectedRegions, Defects, 'area', 'and', 20, 9999)
area_center (Defects, DefectArea, DefectRow, DefectColumn)
```

复杂项目可以组合区域、XLD、一维测量和 OCR，但每个结果都应保留独立状态与置信信息。

## 第五步 结构化判定

```halcon
count_obj (Defects, DefectCount)
if (Score < 0.65)
    Status := 'POSITION_FAILED'
elseif (DefectCount > 0)
    Status := 'NG_DEFECT'
else
    Status := 'OK'
endif
```

不要只返回布尔值。区分定位失败、图像异常、检测不合格和正常结果，才能正确统计和排查现场问题。

## 第六步 性能优化

1. 先缩小搜索和检测 ROI。
2. 避免在循环中重复创建模型或测量句柄。
3. 使用代表性图像测量各阶段耗时。
4. 只优化真正占用节拍的步骤。
5. 优化后重新跑完整回归集，确认没有以漏检换速度。

## 第七步 回归测试

| 样本组 | 必须覆盖 |
| --- | --- |
| 正常样本 | 产品、批次、位置和亮度变化 |
| 缺陷样本 | 最小缺陷、边界缺陷和组合缺陷 |
| 干扰样本 | 反光、污渍、遮挡和背景杂物 |
| 异常流程 | 无产品、相机断线、图像损坏和定位失败 |

每次算法修改都用同一批样本重新运行，并保存版本、参数、预期结果、实际结果和耗时。

## 常见问题

### 只使用理想图片开发

算法上线后会遇到位置、批次、光照和表面状态变化。数据集必须包含边界样本和失败样本。

### 所有参数写死在程序里

产品参数、相机参数和算法参数应分层保存，并记录适用产品和版本。

### 发生错误后无法复现

至少保存原图、时间、产品编号、算法版本、关键参数、状态码和中间结果摘要。

## 案例入口

- [齿轮边缘毛刺去除实验](/articles/gear-burr-removal.html)
- [桌面零件检测工作站](/articles/inspection-station.html)
- [HALCON 机器视觉完整学习路线](/articles/halcon-machine-vision-course-map.html)
