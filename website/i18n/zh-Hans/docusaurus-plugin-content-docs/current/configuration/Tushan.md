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
  
### 自定义布局

`Tushan` 中的布局是完全可以被自定义的，包括整体布局以及细节的header/footer等。

一个修改布局的示例如下:

```tsx
<Tushan
  header={'My Admin'}
  footer={'Build with MsgByte'}
  dashboard={<Dashboard />}
>
</Tushan>
```

在这个示例中自定义了标题栏与底部的footer

关于如何定义仪表盘可以见 [自定义仪表盘](../guide/custom-dashboard.md)

或者你也可以整体替换掉整个布局, 如下:

```tsx
<Tushan
  layout={<MyLayout />}
>
</Tushan>
```

你可以在源码中查看默认布局实现用于参考:

[https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/layout/index.tsx](https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/layout/index.tsx)

### 自定义登录界面

类似的，你可以直接在Tushan组件中进行自定义登录界面

```tsx
<Tushan
  loginPage={<MyLogin />}
>
</Tushan>
```

登录界面的实现可以参考默认的登录页面实现:

[https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/defaults/LoginPage.tsx](https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/defaults/LoginPage.tsx)
