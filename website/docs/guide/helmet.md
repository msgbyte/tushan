---
sidebar_position: 5
title: Customizing Document Head
---

Commonly, there might be a need to modify the webpage's title, language, meta information, etc.

`Tushan`, being a ready-to-use backend management solution, comes with `react-helmet` exported out of the box.

The usage is very straightforward, as shown below:

```tsx
<Helmet>
    <meta charSet="utf-8" />
    <title>My Title</title>
    <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
```
