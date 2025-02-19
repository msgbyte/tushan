---
sidebar_position: 1
title: Nextjs
---

## Use in Nextjs

### transpile source code

As nextjs will not auto transpile modules in `node_module`. so you should manual assign it should be process in build stage.

- [Reference](https://nextjs.org/docs/architecture/nextjs-compiler#module-transpilation)



### Only render in client side

as tushan is a pure client library and not ready for SSR, so just keep everything is in client render will avoid much problem

```ts
'use client'
```

- [Reference](https://nextjs.org/docs/app/api-reference/directives/use-client)

### Support not cool in nextjs 15

As nextjs 15 is design for react 19, so its will have some issue between react 18 and 19.

Unfortunately, the component library arco design used by tushan does not fully support react 19.

So at least you need use your own `Message`/`Notification` component rather than `tushan`'s those component.
