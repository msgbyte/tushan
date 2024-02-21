---
sidebar_position: 3
title: 自定义路由
---

除了与后端数据库一一对应的资源路由以外，`tushan` 还支持自定义路由

一个自定义路由定义如下:

```tsx
import { CustomRoute } from 'tushan';
```

```tsx
<Tushan>
  <CustomRoute name="setting" icon={<IconSettings />}>
    <Foo />
  </CustomRoute>
</Tushan>
```

其中`name` 表示路由对应的url第一以及唯一标识

`icon` 标识需要显示在菜单栏上的图标

对于翻译，可以像普通的资源路由一样使用i18n约定好的翻译内容，也可以简单的使用`label`属性用于指定显示名称

另外的，还提供以下属性:

- `noMenu`: 是否在菜单中显示
- `noLayout`: 是否把渲染内容嵌入在框架中(包含顶部导航栏、侧边菜单栏、底部导航栏)
