---
sidebar_position: 8
title: 大文本渲染
---

对于内容过长的文本数据，相比于简单的 `createTextField`, 一般 Tushan 会选择更加适合大文本渲染的 `createTextAreaField` 方式

在 `createTextAreaField` 中对列表中大文本的处理做了一些特殊的优化。

## 列表状态

为了解决列表状态会出现文本过长导致table展示效果不佳的情况。

### 固定宽度

为了让多余的内容采用省略而不是占满大量位置，建议固定改行列表的宽度。如:

```tsx
createTextAreaField('content', {
  list: {
    width: 400,
  },
}),
```

### 省略模式

如果内容比较长，建议开启列表溢出省略模式以提升性能。

```tsx
createTextAreaField('content', {
  list: {
    ellipsis: true,
  },
}),
```

当然也可以同时开始固定宽度与省略

```tsx
createTextAreaField('content', {
  list: {
    width: 400,
    ellipsis: true,
  },
}),
```


## 详情状态

详情状态下默认最多展示5行数据，超出部分将会被折叠

## 编辑状态

编辑状态下会采用文本框而不是输入框以方便用户对长文本进行修改
