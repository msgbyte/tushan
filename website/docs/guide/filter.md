---
sidebar_position: 7
title: 列表过滤
---

作为开箱即用的后台管理平台解决方案，`Tushan` 当然是支持列表过滤的。

在 `<ListTable />` 组件中可以指定需要过滤的字段, `Tushan` 会为你添加到表头。

如下:

```tsx
<ListTable
  filter={[
    createTextField('q', {
      label: 'Search',
    }),
  ]}
/>
```
