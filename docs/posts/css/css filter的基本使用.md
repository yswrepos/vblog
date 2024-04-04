---
title: css filter的基本使用
date: 2024-02-23 01:26:03
tags:
 - css
categories:
 - css
---

CSS中的`filter`属性是一个强大且灵活的工具，允许您对元素（如图片、背景、边框等）应用图形效果，例如模糊、亮度调整、色彩饱和度调整、对比度调整、阴影和更多。这一属性为网页设计师提供了一种在不使用图像编辑软件的情况下直接通过CSS代码对元素进行视觉效果调整的方法。

### 基本语法

```css
selector {
  filter: none | <filter-function> [<filter-function>]*;
}
```

其中`<filter-function>`可以是以下几种：

- `blur(radius)`：应用模糊效果，`radius`定义模糊的程度。
- `brightness(%)`：调整元素的亮度。
- `contrast(%)`：调整元素的对比度。
- `drop-shadow(h-shadow v-shadow blur spread color)`：给元素添加阴影效果。
- `grayscale(%)`：将元素转换成灰度图像，`0%`表示无变化，而`100%`则是完全的灰色。
- `hue-rotate(angle)`：给图像应用色相旋转效果，`angle`定义旋转的角度。
- `invert(%)`：反转元素的颜色。
- `opacity(%)`：调整元素的透明度。
- `saturate(%)`：调整元素的饱和度。
- `sepia(%)`：将元素转换为深褐色，模仿老照片的风格。

### 示例

```css
img {
  filter: grayscale(100%);
}
```

这个例子会将所有`img`元素转换为灰度图像。

```css
div {
  filter: blur(5px) contrast(200%);
}
```

这个例子会将`div`元素先应用5px的模糊效果，然后将对比度提高到原来的两倍。
<!-- more -->

### 注意事项

- 多个滤镜可以串联使用，它们将按照指定的顺序依次应用。
- `filter`属性可能会对性能产生影响，特别是在应用到大量元素或在动画中使用时。
- 并非所有浏览器都原生支持所有滤镜功能，使用时可能需要添加浏览器前缀或使用回退方案。

`filter`属性为Web开发者提供了一种强大的方式，以编程方式控制元素的视觉效果，增强用户界面的美观性和互动性。