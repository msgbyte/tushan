---
sidebar_position: 5
title: 修改document head
---

常见的，我们可能需要修改网页的标题、语言、元信息等。

`Tushan` 作为开箱即用的后台管理自带导出了`react-helmet`。

使用方式非常简单，如下:
```tsx
<Helmet>
    <meta charSet="utf-8" />
    <title>My Title</title>
    <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
```
