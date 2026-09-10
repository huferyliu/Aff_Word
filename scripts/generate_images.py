from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import math

OUT = Path(__file__).resolve().parents[1] / "assets" / "images"
OUT.mkdir(parents=True, exist_ok=True)


def gear_points(cx, cy, outer, inner, teeth=18):
    points = []
    for index in range(teeth * 4):
        angle = -math.pi / 2 + index * math.pi / (teeth * 2)
        radius = outer if index % 4 in (0, 1) else inner
        points.append((cx + math.cos(angle) * radius, cy + math.sin(angle) * radius))
    return points


def draw_gear(size=(900, 680), threshold=False, result=False):
    image = Image.new("RGB", size, "#e8eeeb")
    draw = ImageDraw.Draw(image)
    for y in range(size[1]):
        shade = 232 + int(12 * y / size[1])
        draw.line((0, y, size[0], y), fill=(shade - 2, shade, shade - 1))
    cx, cy = size[0] // 2, size[1] // 2
    gear_fill = "#26332d" if not threshold else "#087a5b"
    draw.polygon(gear_points(cx, cy, 245, 207), fill=gear_fill)
    draw.ellipse((cx - 102, cy - 102, cx + 102, cy + 102), fill="#e8eeeb")
    for angle in range(0, 360, 60):
        x = cx + math.cos(math.radians(angle)) * 145
        y = cy + math.sin(math.radians(angle)) * 145
        draw.ellipse((x - 25, y - 25, x + 25, y + 25), fill="#e8eeeb")
    if not threshold:
        image = image.filter(ImageFilter.GaussianBlur(0.35))
        draw = ImageDraw.Draw(image)
        draw.line((cx - 260, cy + 220, cx + 235, cy - 220), fill="#ffffff", width=3)
    if result:
        draw = ImageDraw.Draw(image)
        draw.ellipse((cx - 268, cy - 268, cx + 268, cy + 268), outline="#e2483d", width=8)
        draw.arc((cx - 275, cy - 275, cx + 275, cy + 275), 310, 350, fill="#ffb000", width=16)
    return image


original = draw_gear()
threshold = draw_gear(threshold=True)
result = draw_gear(threshold=True, result=True)
original.save(OUT / "gear-original.png", optimize=True)
threshold.save(OUT / "gear-threshold.png", optimize=True)

process = Image.new("RGB", (1440, 540), "#f3f6f4")
draw = ImageDraw.Draw(process)
panels = [(original, 0), (threshold, 480), (result, 960)]
for panel, x in panels:
    fitted = panel.resize((440, 332))
    process.paste(fitted, (x + 20, 84))
labels = ["ORIGINAL", "SEGMENTED", "INSPECTED"]
for index, label in enumerate(labels):
    x = index * 480
    draw.text((x + 20, 34), label, fill="#087a5b")
    draw.line((x + 20, 54, x + 458, 54), fill="#cbd6d0", width=2)
process.save(OUT / "gear-process.png", optimize=True)

overview = Image.new("RGB", (1000, 750), "#15211c")
overview.paste(result.resize((860, 650)), (70, 50))
overlay = ImageDraw.Draw(overview)
overlay.rectangle((70, 50, 930, 700), outline="#65c6a5", width=3)
overlay.line((90, 90, 300, 90), fill="#65c6a5", width=3)
overlay.line((90, 90, 90, 240), fill="#65c6a5", width=3)
overlay.text((110, 110), "EDGE INSPECTION", fill="#ffffff")
overlay.text((110, 142), "18 teeth / 1 anomaly", fill="#a7c8bb")
overview.save(OUT / "vision-overview.png", optimize=True)

favicon = Image.new("RGB", (64, 64), "#087a5b")
fav_draw = ImageDraw.Draw(favicon)
fav_draw.rounded_rectangle((5, 5, 59, 59), radius=11, outline="#dff5ed", width=3)
fav_draw.polygon([(32, 14), (49, 49), (41, 49), (37, 40), (27, 40), (23, 49), (15, 49)], fill="#ffffff")
fav_draw.polygon([(32, 25), (29, 34), (35, 34)], fill="#087a5b")
favicon.save(OUT / "favicon.png", optimize=True)
