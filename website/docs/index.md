---
sidebar_position: 1
---

# 介绍

## **涂山: 五分钟构建一个后台管理平台**

<img width="128px" src="/img/logo.svg" />

`Tushan` 是一个自由度极高的，基于React的，开箱即用的后台管理应用前端框架。

作为开发者, 你可以像是调用库一样快速创建一个可用的后台管理框架

一个简单的`Tushan` 应用大概会长成以下样子:

```tsx
import {
  createTextField,
  createEmailField,
  createUrlField,
  jsonServerProvider,
  ListTable,
  Resource,
  Tushan,
} from 'tushan';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
  return (
    <Tushan
      basename="/admin"
      dataProvider={dataProvider}
    >
      <Resource
        name="users"
        label="User"
        list={
          <ListTable
            fields={[
              createTextField('id', {
                label: 'ID',
              }),
              createTextField('name', {
                label: 'Name',
                list: {
                  sort: true,
                },
              }),
              createEmailField('email', {
                label: 'Email',
              }),
              createUrlField('website', {
                label: 'Website',
              }),
            ]}
            action={{ create: true, detail: true, edit: true, delete: true }}
          />
        }
      />
    </Tushan>
  );
}

export default App;
```

我们可以通过指定字段的类型来决定数据表格的表现形式，并且内置实现了常规的增删改查等操作。帮助开发者快速产出一个后端应用的 MVP。

## 预览

预览效果如下:

![](/img/preview/1.png)

![](/img/preview/2.png)

![](/img/preview/3.png)

![](/img/preview/4.png)

> Tushan 的 api 设计受到 [react-admin](https://marmelab.com/react-admin) 很大的启发，两者的接口协议是完全兼容的，这意味着react-admin现成的后端接口生态方案可以完全无缝被 Tushan 使用。如果对 material-ui 设计的后台方案感兴趣的话可以选择 react-admin 作为替代

另外，`Tushan` 还包括一些常用的前端依赖项，如 `styled-components` 和 `arco-design` 等 ，可以帮助您更快地搭建前端界面。

## 在 CodeSandbox 中快速示例

访问 [CodeSandbox](https://codesandbox.io/p/github/msgbyte/tushan/master) 快速获得无后台版本的示例程序。

## UI框架

`Tushan` 的UI组件库是基于字节跳动的 `arco-design`。你可以在[这里](https://arco.design/react/docs/start)访问`arco-design`的官方文档

所有的组件都已经被导出且可以通过`tushan`直接引入
