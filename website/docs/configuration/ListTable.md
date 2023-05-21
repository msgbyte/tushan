---
sidebar_position: 3
title: <ListTable />
---

`<ListTable />` 是一个预设好的列表视图。包含列表展示、侧边栏、过滤条件、导入导出

一个常见的`<ListTable />`长成下面这个样子

```tsx
<ListTable
  fields={[
    createTextField('id'),
    createTextField('name', {
      label: 'Name',
      list: {
        sort: true,
      },
    }),
    createEmailField('email'),
    createUrlField('website'),
  ]}
  action={{ create: true, detail: true, edit: true, delete: true }}
/>
```

- `filter`: 用于定义过滤条件，过滤条件用于提供给用户筛选记录的方式。一个简单的示例是这样的:
  ```tsx
  <ListTable
    filter={[
      createTextField('q', {
        label: 'Search',
      }),
    ]}
  />
  ```
  *一个特殊的约定是我们会定义`q`为通用的搜索条件，比如文档的标题和内容。*

- `fields`: 其中`fields`表示要渲染的字段，在列表中则是列表项，在侧边栏则是对应表单的表单项。通过不同的工厂函数生成的不同字段类型的`createXXXField`函数对应多个不同类型数据的渲染方式。

- `action`: 表示需要支持的常见操作类型，常见的操作类型为`创建`, `查看详情`, `编辑`, `删除`。同时还支持自定义操作。一个自定义操作的例子如下:
  ```tsx
  <ListTable
    action={{
      custom: [
        {
          key: 'foo',
          label: 'Foo',
          onClick: (record: any) => {
            console.log("click record:", record);
          },
        },
      ],
    }}
  />
  ```
