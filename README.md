[简体中文](./README.zh.md)

# Introduction

## **Tushan: Build a Backend Management Platform in Five Minutes**

<img width="128px" src="https://tushan.msgbyte.com/img/logo.svg" />

Official Documentation: [https://tushan.msgbyte.com/](https://tushan.msgbyte.com/)

`Tushan` is a highly flexible, React-based, out-of-the-box frontend framework for backend management applications.

As a developer, you can quickly create a usable backend management framework as if you were calling a library.

A simple `Tushan` application might looks like this:

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

We can determine the presentation of the data table by specifying the types of fields, and built-in functionalities for common operations such as add, delete, edit, and query are implemented to help developers quickly produce an MVP for a backend application.

## Preview

The preview effects are as follows:

![](https://tushan.msgbyte.com/img/preview/1.png)

![](https://tushan.msgbyte.com/img/preview/2.png)

![](https://tushan.msgbyte.com/img/preview/3.png)

![](https://tushan.msgbyte.com/img/preview/4.png)


> The API design of Tushan is greatly inspired by [react-admin](https://marmelab.com/react-admin), and their interface protocols are fully compatible. This means that the backend interface ecosystem of react-admin can be seamlessly used by Tushan. If you're interested in a backend solution designed with material-ui, you can choose react-admin as an alternative.

Additionally, Tushan includes some common frontend dependencies such as styled-components and arco-design, which can help you build your frontend interface more quickly.

## Quick Example in CodeSandbox

Visit [CodeSandbox](https://codesandbox.io/p/github/msgbyte/tushan/master) for a quick example of a version without backend.

## UI Framework

The UI component library of Tushan is based on ByteDance's arco-design. You can access the official documentation of arco-design [here](https://arco.design/react/docs/start).

All components have been exported and can be directly imported through tushan.

## Scan to Visit Tushan Official Website

<img width="360" src="./website/static/img/qrcode.jpg" />
