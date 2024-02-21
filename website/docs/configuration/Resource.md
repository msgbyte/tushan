## `<Resource />` Component

The `<Resource />` component defines an instance of a data entity, automatically generating corresponding menus, routes, and other standard information.

```tsx
<Resource
  name="users"
  label="User"
  icon={<IconUser />}
/>
```

Here, the value of `name` is involved in the automatic request and cache definition of the interface.

The specific implementation of `<Resource />` is determined by its parameters. If it only has the above attributes, it will not contain any content. Generally, we add a `list` parameter as the default page.

For example, to render a simple list:

```tsx
<Resource
  name="users"
  label="User"
  list={
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
  }
/>
```

We can use the built-in `<ListTable />` component in `tushan` to render a basic list. This component can perform common list-related operations like filtering, sorting, CRUD actions, etc.

For field rendering, we can use methods like `createTextField` to inform the `<ListTable />` component of the field types we want to declare. The method signature is `createTextField(source, options?)`, where `source` is the field name unified between the frontend and backend, and `options` are customizable configuration parameters for the field. Different field types may have different configurations.

Additionally, `<ListTable />` provides an `action` parameter to customize whether to enable operations like **create**, **view details**, **edit**, and **delete** for the list.

For search and condition filtering, `<ListTable />` offers a `filter` parameter to construct filter condition fields, like so:
```tsx
<ListTable
  filter={[
    createTextField('q', {
      label: 'Query',
    }),
  ]}
  // ...
/>
```

Typically, `q` is defined as a universal search logic, while other specific fields require the corresponding backend capabilities to support them.

A common list search request body might look like this:

```json
// GET
q: someone
_sort: id
_order: DESC
_start: 0
_end: 20
```
