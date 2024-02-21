---
sidebar_position: 2.5
title: Custom Dashboard
---

By default, Tushan provides a default dashboard component for display.

You have the option to use a custom dashboard or disable the dashboard feature altogether.

## Using a Custom Dashboard

```tsx
<Tushan dashboard={<MyDashboard />}>
  {/*...*/}
</Tushan>
```

The dashboard component is fully customizable. You can write it just like any regular component and implement your own dashboard display within it.

The default dashboard code for Tushan is available here: [https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/defaults/Dashboard.tsx](https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/defaults/Dashboard.tsx)

Alternatively, you can also refer to the custom dashboard implementation in Tailchat: [https://github.com/msgbyte/tailchat/blob/master/server/admin/src/client/components/Dashboard.tsx](https://github.com/msgbyte/tailchat/blob/master/server/admin/src/client/components/Dashboard.tsx)

## Disabling the Dashboard Feature

If you do not like or need the dashboard, you can opt to disable this feature.

```tsx
<Tushan dashboard={false}>
  {/*...*/}
</Tushan>
```
