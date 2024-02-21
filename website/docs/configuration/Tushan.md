## `<Tushan />` Component

The `<Tushan />` component serves as the entry point for backend management. A simple `<Tushan />` component setup might look like this:

```tsx
<Tushan
  basename="/"
  dataProvider={dataProvider}
>
  {/* ... */}
</Tushan>
```

- `basename` defines the base path for routing, with the default being `/`. You can change this to `/admin` or another subpath to integrate with other projects.
- `dataProvider` specifies how to interact with backend interfaces. For standard JSON data formats, you can directly use the preset solution from `tushan`:
  ```tsx
  import { jsonServerProvider } from 'tushan';

  const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
  ```

  Replace `https://jsonplaceholder.typicode.com` with your own server's API endpoint.

  You can also implement your own `dataProvider`. The specific type declaration can refer to the following structure:

  ```tsx
  import { DataProvider, fetchJSON, HTTPClient } from 'tushan';

  export function customDataProvider(
    apiUrl: string,
    httpClient: HTTPClient = fetchJSON
  ): DataProvider {
    // ...
  }
  ```
  
### Custom Layout

The layout in `Tushan`, including the overall structure and details like header/footer, is fully customizable.

Here is an example of modifying the layout:

```tsx
<Tushan
  header={'My Admin'}
  footer={'Build with MsgByte'}
  dashboard={<Dashboard />}
>
</Tushan>
```

This example customizes the header and the footer.

For information on customizing the dashboard, see [Custom Dashboard](../guide/custom-dashboard.md).

Alternatively, you can replace the entire layout as follows:

```tsx
<Tushan
  layout={<MyLayout />}
>
</Tushan>
```

You can refer to the default layout implementation in the source code for guidance:

[https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/layout/index.tsx](https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/layout/index.tsx)

### Custom Login Page

Similarly, you can customize the login page directly within the Tushan component:

```tsx
<Tushan
  loginPage={<MyLogin />}
>
</Tushan>
```

The implementation of the login page can refer to the default login page:

[https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/defaults/LoginPage.tsx](https://github.com/msgbyte/tushan/blob/master/packages/tushan/client/components/defaults/LoginPage.tsx)
