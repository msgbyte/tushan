---
sidebar_position: 6
title: List Sorting
---

As a ready-to-use backend management platform solution, `Tushan` naturally supports list sorting (not enabled by default).

You simply need to add the following flag to the specified field:

```tsx
createTextField('id', {
  list: {
    sort: true,
  },
}),
```
