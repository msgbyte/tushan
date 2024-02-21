---
sidebar_position: 7
title: List Filtering
---

As a ready-to-use backend management platform solution, `Tushan` naturally supports list filtering.

Within the `<ListTable />` component, you can specify the fields that need filtering, and `Tushan` will add them to the table header for you.

For example:

```tsx
<ListTable
  filter={[
    createTextField('q', {
      label: 'Search',
    }),
  ]}
/>
```
