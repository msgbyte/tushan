---
sidebar_position: 1
title: <Tushan />
---

## `<Tushan />` 组件

`<Tushan />` 组件是后台管理中一切的入口，一个一个最简单的 `<Tushan />` 组件大概是长成下面这样的:

```tsx
<Tushan
  basename="/"
  dataProvider={dataProvider}
>
  {/* ... */}
</Tushan>
```

- `basename` 定义路由的基础路径，默认是 `/`, 你也可以将其改为 `/admin` 或者其他的子路径以方便和其他的项目做集成
- `dataProvider` 定义与后端接口交互的方式，一般来说常规的json数据格式可以直接用 `tushan` 预设好的方案:
  ```tsx
  import { jsonServerProvider } from 'tushan';

  const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
  ```

  其中 `https://jsonplaceholder.typicode.com` 替换成自己的服务端接口地址

  当然你可以自己实现自己的`dataProvider`, 具体类型声明可以参考如下结构:

  ```tsx
  import { DataProvider, fetchJSON, HTTPClient } from 'tushan';

  export function customDataProvider(
    apiUrl: string,
    httpClient: HTTPClient = fetchJSON
  ): DataProvider {
    // ...
  }
  ```
