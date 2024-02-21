---
sidebar_position: 3
title: Custom Routes
---

In addition to the resource routes that correspond one-to-one with the backend database, `tushan` also supports custom routes.

A custom route is defined as follows:

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

Here, `name` represents the unique identifier for the route's URL.

`icon` indicates the icon to be displayed in the menu bar.

For translations, you can use the i18n conventions as with standard resource routes, or you can simply use the `label` property to specify a display name.

Additionally, the following properties are provided:

- `noMenu`: Whether to display in the menu.
- `noLayout`: Whether to embed the rendered content within the framework (including the top navigation bar, side menu bar, bottom navigation bar).
