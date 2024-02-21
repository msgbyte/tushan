---
sidebar_position: 2.5
title: 自定义仪表盘
---

默认的，Tushan会提供给你的一个默认的仪表盘组件用于展示。

你可以使用自定义的仪表盘或者把仪表盘关闭

## 使用自定义仪表盘

```tsx
<Tushan dashboard={<MyDashboard />}>
  {/*...*/}
</Tushan>
```

仪表盘组件是一个完全可供自定义的组件，你可以像编写正常的组件一样编写它。你可以在组件中实现自己的仪表盘显示。

Tushan 默认的仪表盘代码在这里: [https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/defaults/Dashboard.tsx](https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/defaults/Dashboard.tsx)

或者你也可以参考 Tailchat 自定义仪表盘的实现: [https://github.com/msgbyte/tailchat/blob/master/server/admin/src/client/components/Dashboard.tsx](https://github.com/msgbyte/tailchat/blob/master/server/admin/src/client/components/Dashboard.tsx)

## 关闭仪表盘功能

如果你不喜欢或者不需要仪表盘，则可以选择关闭该功能。

```tsx
<Tushan dashboard={false}>
  {/*...*/}
</Tushan>
```
