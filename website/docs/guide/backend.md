---
sidebar_position: 0
title: Data Backend
---

`Tushan`'s data interface design is consistent with `react-admin`, allowing for the direct reuse of the existing backend interface ecosystem of `react-admin`.

## Using Existing Community Ecosystem

Visit the following link to view directly usable data backends: [https://marmelab.com/react-admin/DataProviderList.html](https://marmelab.com/react-admin/DataProviderList.html)

## Implementing a Corresponding Backend Based on Existing Interface Formats

Taking the default built-in `jsonServerProvider` as an example, you need to implement the following interfaces on your backend:

- `GET /`: Fetch list data
  - Query parameters:
    - `_sort`: Sort field
    - `_order`: Sort order: `ASC` | `DESC`
    - `_start`: Query start position
    - `_end`: Query end position
  - Return content:
    - Header: `X-Total-Count: <number>` defines the total count
    - Body: An array of database entries, each must include an id

- `GET /:id`: Fetch single data entry
  - Query parameters:
    - `:id`: Database id
  - Return content:
    - Body: A database object, must include an id

- `POST /`: Create data
  - Query parameters:
    - Body: Object of create form content
  - Return content:
    - Body: The newly created database object, must include an id

- `PUT /:id`: Update data
  - Query parameters:
    - Body: Object of edit form content
  - Return content:
    - Body: The complete data of the edited form, must include an id

- `DELETE /:id`: Delete data
  - Query parameters:
    - `:id`: The id of the data to be deleted
  - Return content:
    - Body: The deleted data object

You can use the `chrome devtool` network panel to observe the request parameters.

## Implementing Your Own `DataProvider` to Adapt to Existing Backends

First, all interface definitions are defined in the `DataProvider` type, and you can start as follows:

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

You need to implement the above methods separately. Adapt the interface data through different requests. You can refer to the implementation of `jsonServerProvider` that comes with `tushan`.
