---
sidebar_position: 0
title: 数据后端
---

`Tushan` 的数据接口设计与 `react-admin` 保持一致，因此我们可以直接复用 `react-admin` 已有的后端接口生态.

## 使用社区已有的生态

访问此处查看可以直接使用的数据后端: [https://marmelab.com/react-admin/DataProviderList.html](https://marmelab.com/react-admin/DataProviderList.html)

## 基于现有的接口格式实现相应后端

以默认内置的 `jsonServerProvider` 为例:

你需要在你的后端分别实现以下接口:

- `GET /`: 获取列表数据
  - 查询参数:
    - `_sort`: 排序字段
    - `_order`: 排序方式: `ASC` | `DESC`
    - `_start`: 查询开始位置
    - `_end`: 查询结束位置
  - 返回内容:
    - Header: `X-Total-Count: <number>` 定义总数
    - Body: 数据库数组，必须包含id

- `GET /:id`: 获取单条数据
  - 查询参数:
    - `:id`: 数据库id
  - 返回内容:
    - Body: 数据库对象，必须包含id

- `POST /`: 创建数据
  - 查询参数:
    - Body: 创建表单内容对象
  - 返回内容:
    - Body: 新建的数据库对象，必须包含id

- `PUT /:id`: 修改数据
  - 查询参数:
    - Body: 编辑表单内容对象
  - 返回内容:
    - Body: 编辑后的表单完整数据，必须包含id

- `DELETE /:id`: 删除数据
  - 查询参数:
    - `:id`: 删除数据的id
  - 返回内容:
    - Body: 删除的数据对象

你可以打开 `chrome devtool` 的 network panel 来查看请求的参数

## 实现自己的 `DataProvider` 以适配已有的后端

首先所有的接口定义都是定义在 `DataProvider` 类型中的，你可以通过以下方式开始:

```tsx
import type { DataProvider } from 'tushan';

export const myCustomDataProvider: DataProvider = {
  create: () => Promise.resolve({ data: null } as any),
  delete: () => Promise.resolve({ data: null } as any),
  deleteMany: () => Promise.resolve({ data: [] }),
  getList: () => Promise.resolve({ data: [], total: 0 }),
  getMany: () => Promise.resolve({ data: [] }),
  getManyReference: () => Promise.resolve({ data: [], total: 0 }),
  getOne: () => Promise.resolve({ data: null } as any),
  update: () => Promise.resolve({ data: null } as any),
  updateMany: () => Promise.resolve({ data: [] }),
};
```

你需要分别实现上面的方法。通过不同的请求来实现接口数据的适配。你可以参考`tushan`自带的`jsonServerProvider`的实现
