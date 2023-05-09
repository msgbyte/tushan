---
sidebar_position: 2
title: <Resource />
---

`<Resource />` 组件定义一个数据实体的实例，会自动产生对应的菜单、路由等常规信息。

```tsx
<Resource
  name="users"
  label="User"
  icon={<IconUser />}
/>
```

其中 `name` 的值会涉及到接口的自动请求与缓存定义

`<Resource />` 的具体实现由其参数决定，如果仅有上面的属性的话是没有任何内容的，一般而言我们会为期增加list参数作为默认的页面。

比如渲染一个最简单的列表

```tsx
<Resource
  name="users"
  label="User"
  list={
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
  }
/>
```

我们可以使用 `tushan` 内置的 `<ListTable />` 组件来渲染一个基本列表。这个组件可以实现: 过滤、排序、增删改查等常见的列表相关操作。

对于字段的渲染，我们可以通过形如 `createTextField` 的方法告知 `<ListTable />` 组件我们要声明的字段类型。参数类型为: `createTextField(source, options?)`，其中`source`是前后端统一的字段名，而options则是该字段的一些可供自定义的配置参数。对于不同的字段类型可能会有不同的配置。

另外, `<ListTable />` 还提供了一个 `action` 参数用于自定义是否打开列表的 **创建**/**查看详情**/**编辑**/**删除** 的操作。

对于信息的搜索与条件过滤。`<ListTable />`提供`filter`参数用于构建过滤条件字段。形如:
```tsx
<ListTable
  filter={[
    createTextField('q', {
      label: 'Query',
    }),
  ]}
  // ...
/>
```

一般来说，我们为把`q`定义为通用的搜索逻辑，其他的具体的字段需要响应的后端提供相关能力。

一个常见的列表搜索请求体大概是这样的:

```json
// GET
q: someone
_sort: id
_order: DESC
_start: 0
_end: 20
```
