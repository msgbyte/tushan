---
sidebar_position: 6
title: 列表排序
---

作为开箱即用的后台管理平台解决方案，`Tushan` 当然是支持列表排序的(默认不开启)。

只需要在指定字段中添加如下标识即可:

```tsx
createTextField('id', {
  list: {
    sort: true,
  },
}),
```
