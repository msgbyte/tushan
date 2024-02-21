---
sidebar_position: 1
---

# Introduction

## **Tushan: Build a Backend Management Platform in Five Minutes**

<img width="128px" src="/img/logo.svg" />

`Tushan` is a highly flexible, React-based, ready-to-use frontend framework for backend management applications.

As a developer, you can quickly create a usable backend management framework as if you were calling a library. It includes common CRUD operations, filtering, exporting, and other common requirements. With `Tushan`, you can focus more on core business logic rather than backend management.

A simple `Tushan` application might look like this:

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

You can determine the appearance of the data table by specifying the field types, and common CRUD operations are internally implemented. This helps developers quickly produce an MVP for a backend application.

## Preview

Preview effects are as follows:

![](/img/preview/1.png)

![](/img/preview/2.png)

![](/img/preview/3.png)

![](/img/preview/4.png)

> The API design of Tushan is greatly inspired by [react-admin](https://marmelab.com/react-admin), and their interface protocols are fully compatible. This means that the ready-made backend interface ecosystem of react-admin can be seamlessly used by Tushan. If you are interested in backend solutions designed with material-ui, you can choose react-admin as an alternative.

Additionally, `Tushan` includes some commonly used frontend dependencies such as `styled-components` and `arco-design`, which can help you build frontend interfaces more quickly.

## Quick Examples in CodeSandbox

Visit [CodeSandbox](https://codesandbox.io/p/github/msgbyte/tushan/master) to quickly get an example program without a backend.

Demo program account: `tushan` / `tushan`

## UI Framework

The UI component library of `Tushan` is based on ByteDance's `arco-design`. You can access the official documentation of `arco-design` [here](https://arco.design/react/docs/start).

All components have been exported and can be directly imported via `tushan`.
