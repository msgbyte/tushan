---
sidebar_position: 1
---

# 介绍

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
            filter={[
              createTextField('q', {
                label: 'Query',
              }),
            ]}
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

我们可以通过指定字段的类型来决定数据表格长成什么样，并且内置实现了常规的增删改查等操作。帮助用户快速产出一个 MVP。

预览效果如下:

![](/img/preview/1.png)

![](/img/preview/2.png)

![](/img/preview/3.png)

![](/img/preview/4.png)

> Tushan 的 api 设计受到 [react-admin](https://marmelab.com/react-admin) 很大的启发，如果对 material-ui 设计的后台方案感兴趣的话可以选择 react-admin 作为替代

另外，`Tushan` 还包括一些常用的前端依赖项，如 `styled-components` 和 `arco-design` ，可以帮助您更快地搭建前端界面。

## 在 CodeSandbox 中快速示例

访问 [CodeSandbox](https://codesandbox.io/p/github/msgbyte/tushan/master) 快速获得无后台版本的示例程序。
