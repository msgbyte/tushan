## `<ListTable />`

The `<ListTable />` component is a pre-configured list view that includes list display, sidebar, filter conditions, and import/export functionality.

A typical `<ListTable />` looks like this:

```tsx
<ListTable
  fields={[
    createTextField('id'),
    createTextField('name', {
      label: 'Name',
      list: {
        sort: true,
      },
    }),
    createEmailField('email'),
    createUrlField('website'),
  ]}
  action={{ create: true, detail: true, edit: true, delete: true }}
/>
```

- `filter`: Defines filter conditions to allow users to filter records. A simple example is as follows:
  ```tsx
  <ListTable
    filter={[
      createTextField('q', {
        label: 'Search',
      }),
    ]}
  />
  ```
  *A special convention is defining `q` as a universal search condition, such as for document titles and content.*

- `fields`: The `fields` parameter specifies the fields to be rendered in the list, with each field corresponding to a list item in the list view and a form field in the sidebar. Different types of fields are rendered using various factory functions like `createXXXField`, tailored to different data types.

- `action`: Specifies the common operation types to be supported, such as `create`, `view details`, `edit`, `delete`, along with `export`, `refresh`, and also supports custom operations. An example of a custom operation is as follows:
  ```tsx
  <ListTable
    action={{
      custom: [
        {
          key: 'foo',
          label: 'Foo',
          onClick: (record: any) => {
            console.log("click record:", record);
          },
        },
      ],
    }}
  />
  ```

This setup allows for a flexible and feature-rich list view that can be customized to fit various backend management needs.
