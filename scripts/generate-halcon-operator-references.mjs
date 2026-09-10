import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const guidePath = path.join(root, "content", "reference", "halcon-common-operator-guide.md");
const outputDir = path.join(root, "content", "reference");
const docsDir = process.env.HALCON_OPERATOR_DOCS
  || "C:\\Users\\26982\\AppData\\Local\\Programs\\MVTec\\HALCON-25.11-Progress\\doc_en_US\\html\\reference\\operators";

const guide = fs.readFileSync(guidePath, "utf8");
const sections = guide.split(/^### /m).slice(1);

const examples = {
  read_image: "read_image (Image, 'sample.png')",
  get_image_size: "get_image_size (Image, Width, Height)",
  count_channels: "count_channels (Image, Channels)",
  decompose3: "decompose3 (Image, Red, Green, Blue)",
  rgb1_to_gray: "rgb1_to_gray (Image, GrayImage)",
  gen_rectangle1: "gen_rectangle1 (ROI, 100, 120, 420, 680)",
  reduce_domain: "reduce_domain (Image, ROI, ImageReduced)",
  dev_display: "dev_display (Image)",
  min_max_gray: "min_max_gray (Region, Image, 0, Min, Max, Range)",
  scale_image: "scale_image (Image, ImageScaled, 1.2, -20)",
  mean_image: "mean_image (Image, ImageMean, 9, 9)",
  gauss_filter: "gauss_filter (Image, ImageGauss, 1.5)",
  median_image: "median_image (Image, ImageMedian, 'circle', 2, 'mirrored')",
  emphasize: "emphasize (Image, ImageEmphasized, 15, 15, 1.5)",
  threshold: "threshold (Image, Region, 0, 100)",
  dyn_threshold: "dyn_threshold (Image, ImageMean, Region, 12, 'dark')",
  connection: "connection (Region, ConnectedRegions)",
  count_obj: "count_obj (Objects, Number)",
  select_shape: "select_shape (ConnectedRegions, SelectedRegions, 'area', 'and', 500, 999999)",
  select_shape_std: "select_shape_std (Regions, SelectedRegions, 'max_area', 70)",
  select_gray: "select_gray (Regions, Image, SelectedRegions, 'mean', 'and', 80, 180)",
  area_center: "area_center (Region, Area, Row, Column)",
  smallest_rectangle2: "smallest_rectangle2 (Region, Row, Column, Phi, Length1, Length2)",
  intensity: "intensity (Region, Image, Mean, Deviation)",
  erosion_circle: "erosion_circle (Region, RegionErosion, 3.5)",
  dilation_circle: "dilation_circle (Region, RegionDilation, 3.5)",
  opening_circle: "opening_circle (Region, RegionOpening, 3.5)",
  closing_circle: "closing_circle (Region, RegionClosing, 3.5)",
  fill_up: "fill_up (Region, RegionFillUp)",
  difference: "difference (Region, SubRegion, RegionDifference)",
  union1: "union1 (Regions, RegionUnion)",
  edges_sub_pix: "edges_sub_pix (Image, Edges, 'canny', 1.2, 20, 40)",
  segment_contours_xld: "segment_contours_xld (Contours, ContoursSplit, 'lines_circles', 5, 4, 2)",
  select_contours_xld: "select_contours_xld (Contours, SelectedContours, 'contour_length', 50, 999999, -0.5, 0.5)",
  fit_line_contour_xld: "fit_line_contour_xld (Contour, 'tukey', -1, 0, 5, 2, RowBegin, ColBegin, RowEnd, ColEnd, Nr, Nc, Dist)",
  fit_circle_contour_xld: "fit_circle_contour_xld (Contour, 'atukey', -1, 2, 0, 5, 2, Row, Column, Radius, StartPhi, EndPhi, PointOrder)",
  create_shape_model: "create_shape_model (Template, 'auto', rad(-20), rad(40), 'auto', 'auto', 'use_polarity', 'auto', 'auto', ModelID)",
  find_shape_model: "find_shape_model (Image, ModelID, rad(-20), rad(40), 0.6, 1, 0.5, 'least_squares', 0, 0.9, Row, Column, Angle, Score)",
  clear_shape_model: "clear_shape_model (ModelID)",
  vector_angle_to_rigid: "vector_angle_to_rigid (RowRef, ColRef, AngleRef, Row, Column, Angle, HomMat2D)",
  affine_trans_region: "affine_trans_region (Region, RegionTrans, HomMat2D, 'nearest_neighbor')",
  gen_measure_rectangle2: "gen_measure_rectangle2 (Row, Column, Phi, Length1, Length2, Width, Height, 'bilinear', MeasureHandle)",
  measure_pos: "measure_pos (Image, MeasureHandle, 1.0, 20, 'all', 'all', RowEdge, ColumnEdge, Amplitude, Distance)",
  close_measure: "close_measure (MeasureHandle)",
  sort_region: "sort_region (Characters, SortedCharacters, 'character', 'true', 'column')",
  read_ocr_class_mlp: "read_ocr_class_mlp ('Industrial_0-9A-Z_NoRej.omc', OCRHandle)",
  do_ocr_multi_class_mlp: "do_ocr_multi_class_mlp (Characters, Image, OCRHandle, Class, Confidence)",
  clear_ocr_class_mlp: "clear_ocr_class_mlp (OCRHandle)"
};

const combinations = {
  read_image: "`read_image → get_image_size → count_channels` 用于输入检查。",
  threshold: "`threshold → connection → select_shape` 是基础 Blob 分析链路。",
  dyn_threshold: "`mean_image → dyn_threshold → connection → select_shape` 适合局部亮度不均。",
  connection: "`threshold → connection → select_shape` 用于把阈值区域拆成可筛选目标。",
  edges_sub_pix: "`edges_sub_pix → segment_contours_xld → select_contours_xld → fit_*_contour_xld` 用于几何轮廓分析。",
  create_shape_model: "`create_shape_model → find_shape_model → vector_angle_to_rigid → affine_trans_region` 用于定位和跟随 ROI。",
  find_shape_model: "`find_shape_model → vector_angle_to_rigid → affine_trans_region` 用于把基准检测区域对齐到当前工件。",
  gen_measure_rectangle2: "`gen_measure_rectangle2 → measure_pos → close_measure` 是一维测量的完整句柄生命周期。",
  measure_pos: "`gen_measure_rectangle2 → measure_pos → close_measure` 用于提取边缘并及时释放测量对象。",
  read_ocr_class_mlp: "`read_ocr_class_mlp → sort_region → do_ocr_multi_class_mlp → clear_ocr_class_mlp` 用于 OCR 分类。"
};

const meanings = {
  Image: "图像对象", Region: "区域对象", Regions: "区域对象元组", FileName: "文件路径或文件名",
  Width: "图像宽度或相关宽度", Height: "图像高度或相关高度", Channels: "图像通道数量",
  Red: "红色通道图像", Green: "绿色通道图像", Blue: "蓝色通道图像", GrayImage: "输出灰度图像",
  Row: "中心或结果的行坐标", Column: "中心或结果的列坐标", Row1: "左上角行坐标", Column1: "左上角列坐标",
  Row2: "右下角行坐标", Column2: "右下角列坐标", Phi: "方向角，单位为弧度", Radius: "圆半径或形态学结构元素半径",
  MinGray: "灰度下限", MaxGray: "灰度上限", Min: "最小值", Max: "最大值", Range: "最大值与最小值之差",
  Mult: "灰度乘法系数", Add: "灰度偏移量", MaskWidth: "滤波窗口宽度", MaskHeight: "滤波窗口高度",
  Sigma: "高斯平滑尺度", Threshold: "最小响应或边缘幅度阈值", Offset: "局部阈值偏移量",
  LightDark: "选择亮目标、暗目标或不等关系", Feature: "用于筛选的特征名称", Operation: "多特征组合方式",
  MinValue: "特征允许的下限", MaxValue: "特征允许的上限", Area: "区域面积", Number: "对象数量",
  Mean: "平均灰度", Deviation: "灰度标准差", Length1: "第一主轴半长", Length2: "第二主轴半长",
  Filter: "边缘滤波器类型", Low: "低阈值", High: "高阈值", Mode: "处理模式", MaxLineDist1: "第一距离容差",
  MaxLineDist2: "第二距离容差", MinLength: "最小轮廓长度", MaxLength: "最大轮廓长度",
  Algorithm: "拟合算法", MaxNumPoints: "参与拟合的最大点数", ClippingEndPoints: "轮廓端点裁剪点数",
  Iterations: "鲁棒拟合迭代次数", ClippingFactor: "离群点裁剪因子", RowBegin: "拟合线起点行坐标",
  ColBegin: "拟合线起点列坐标", RowEnd: "拟合线终点行坐标", ColEnd: "拟合线终点列坐标",
  Nr: "直线法向量行分量", Nc: "直线法向量列分量", Dist: "直线到原点的距离参数",
  StartPhi: "圆弧起始角", EndPhi: "圆弧结束角", PointOrder: "轮廓点方向",
  NumLevels: "图像金字塔层数", AngleStart: "搜索起始角", AngleExtent: "角度搜索范围", AngleStep: "角度步长",
  Optimization: "模型优化方式", Metric: "边缘极性度量", Contrast: "模型边缘对比度", MinContrast: "最低对比度",
  ModelID: "形状模型句柄", MinScore: "最低匹配分数", NumMatches: "最大匹配数量", MaxOverlap: "匹配结果最大重叠率",
  SubPixel: "亚像素精化方法", Greediness: "搜索贪婪度", Angle: "匹配得到的角度", Score: "匹配分数",
  HomMat2D: "二维齐次变换矩阵", Interpolate: "插值方式", MeasureHandle: "一维测量对象句柄",
  Transition: "边缘极性", Select: "边缘选择策略", RowEdge: "边缘行坐标", ColumnEdge: "边缘列坐标",
  Amplitude: "边缘幅度", Distance: "相邻边缘距离", SortMode: "区域排序模式", Order: "升序或降序",
  RowOrCol: "按行或列作为主要排序方向", OCRHandle: "OCR 分类器句柄", Class: "识别类别", Confidence: "识别置信度"
};

function decode(value) {
  return value
    .replace(/&nbsp;|&#160;|\u00a0/g, " ")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function stripMarkdown(value) {
  return value.replace(/`([^`]+)`/g, "$1").trim();
}

function field(body, label) {
  const match = body.match(new RegExp(`\\*\\*${label}：\\*\\*([^\\n]+)`));
  if (!match) throw new Error(`Missing ${label}`);
  return match[1].trim();
}

function operatorMetadata(name) {
  const file = path.join(docsDir, `${name}.html`);
  if (!fs.existsSync(file)) throw new Error(`Official operator document not found: ${file}`);
  const html = fs.readFileSync(file, "utf8");
  const hdevelop = html.match(/<h2 id="sec_synopsis">Signature<\/h2>[\s\S]*?<div data-if="hdevelop"[^>]*>[\s\S]*?<code>([\s\S]*?)<\/code>[\s\S]*?<\/div>/);
  if (!hdevelop) throw new Error(`HDevelop signature not found: ${name}`);
  const parameterNames = [...hdevelop[1].matchAll(/<i>([^<]+)<\/i>/g)].map((match) => decode(match[1]));
  const params = parameterNames.map((parameter) => {
    const escaped = parameter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const directionMatch = html.match(new RegExp(`<span id="${escaped}" class="parname">[\\s\\S]*?\\((input|output)_(object|control)\\)`));
    return {
      name: parameter,
      direction: directionMatch?.[1] === "output" ? "输出" : "输入",
      meaning: meanings[parameter] || (/^Image/.test(parameter) ? "图像对象" : /^Region/.test(parameter) ? "区域对象" : "算子参数，具体取值见参数设置")
    };
  });
  return { signature: `${name} (${parameterNames.join(", ")})`, params };
}

function tagsFor(name, body) {
  const tags = ["HALCON", "算子参考"];
  if (/OCR|ocr|字符/.test(body + name)) tags.push("OCR");
  else if (/模板|shape_model|匹配/.test(body + name)) tags.push("形状匹配");
  else if (/measure|测量/.test(body + name)) tags.push("几何测量");
  else if (/XLD|轮廓|边缘/.test(body + name)) tags.push("边缘检测");
  else if (/erosion|dilation|opening|closing|fill_up|difference|union1|形态/.test(body + name)) tags.push("形态学");
  else if (/threshold|Region|区域|Blob|connection|select_|area_center|intensity/.test(body + name)) tags.push("区域分析");
  else tags.push("图像处理");
  return tags;
}

function genericCombination(name, body) {
  if (combinations[name]) return combinations[name];
  if (/erosion|dilation|opening|closing|fill_up|difference|union1/.test(name)) return "通常放在分割和连通域处理之后，用于清理、补全或组合区域，再进入特征筛选。";
  if (/fit_|contours_xld/.test(name)) return "通常与亚像素边缘提取、轮廓分割和轮廓筛选组合使用。";
  if (/ocr|sort_region/.test(name)) return "通常与字符分割、排序、分类器加载和资源释放组合使用。";
  if (/gray|image|filter|emphasize|channels|decompose/.test(name)) return "通常用于输入检查或图像预处理，处理结果再交给分割、边缘或匹配算子。";
  return `根据“${stripMarkdown(field(body, "适用场景"))}”所在流程，与前后算子组合使用。`;
}

const generated = [];
const indexRows = [];
for (const section of sections) {
  const newline = section.indexOf("\n");
  const name = section.slice(0, newline).trim();
  const body = section.slice(newline + 1);
  const intro = field(body, "算子介绍");
  const keyParameters = field(body, "关键参数");
  const settings = field(body, "参数设置");
  const scenarios = field(body, "适用场景");
  const cautions = field(body, "注意事项");
  const { signature, params } = operatorMetadata(name);
  const tags = tagsFor(name, body);
  const parameterRows = params.map((param) => `| ${param.name} | ${param.direction} | ${param.meaning} |`).join("\n");
  const content = `---
title: ${name} 算子参考
slug: reference-${name.replaceAll("_", "-")}
category: HALCON 算子
type: reference
listed: false
tags:
${tags.map((tag) => `  - ${tag}`).join("\n")}
level: 速查
date: 2026-09-10
description: 快速查询 ${name} 的算子介绍、参数设置、最小示例和适用场景。
---

## 算子签名

\`\`\`halcon
${signature}
\`\`\`

## 算子介绍

${intro}

## 参数

| 参数 | 方向 | 含义 |
| --- | --- | --- |
${parameterRows}

**关键参数：**${keyParameters}

## 参数设置

${settings}

## 最小示例

\`\`\`halcon
${examples[name] || signature}
\`\`\`

示例只展示最小调用位置。输入图像、区域、模型或句柄需要在此前正确创建。

## 适用场景

${scenarios}

## 常见组合

${genericCombination(name, body)}

## 注意事项

${cautions}

参数类型、允许范围和版本差异以当前安装版本的 HALCON Operator Reference 为准。
`;
  const target = path.join(outputDir, `reference-${name.replaceAll("_", "-")}.md`);
  fs.writeFileSync(target, content, "utf8");
  generated.push(path.basename(target));
  indexRows.push(`| [${name}](/articles/reference-${name.replaceAll("_", "-")}.html) | ${stripMarkdown(intro)} |`);
}

const linksStart = "<!-- operator-reference-links:start -->";
const linksEnd = "<!-- operator-reference-links:end -->";
const linksSection = `${linksStart}
## 独立算子参考页

以下算子均已整理为独立速查页，页面格式统一包含签名、介绍、参数表、设置建议、最小示例、适用场景、常见组合和注意事项。

| 算子 | 作用 |
| --- | --- |
${indexRows.join("\n")}
${linksEnd}`;
let updatedGuide = guide;
if (guide.includes(linksStart)) {
  updatedGuide = guide.replace(new RegExp(`${linksStart}[\\s\\S]*?${linksEnd}`), linksSection);
} else {
  updatedGuide = guide.replace("## 参数选型速查", `${linksSection}\n\n## 参数选型速查`);
}
fs.writeFileSync(guidePath, updatedGuide, "utf8");

console.log(JSON.stringify({ generated: generated.length, files: generated }, null, 2));
