---
sidebar_position: 11
title: Permission Control and RBAC
---

Generally, we use `Tushan` as a solution for quickly building applications, initially designed to handle a single full-control permission scenario.

However, as iterations progress and projects expand, the content and administrators become more complex, necessitating finer control over permissions.

`Tushan` provides a built-in permission control module within the authProvider. After a successful login, we can define `getPermissions` to control how we obtain permissions. This function returns a promise, meaning we can also acquire permissions through a secondary request or from the response obtained post-login.

```tsx
export const authProvider: AuthProvider = {
  // ....
  getPermissions: () => Promise.resolve(''),
};
```

You can return any result from `getPermissions`, as `Tushan` will not process its content but return it as-is to the user.

## Role-Based Access Control (RBAC)

For example, you can return an array of roles as user permissions in `getPermissions`:

```tsx
export const authProvider: AuthProvider = {
  // ....
  getPermissions: () => Promise.resolve(['admin', 'user']), // This is a demo; actual roles can be obtained from a token or an API.
};
```

Then, control access to resources based on roles. For instance, assuming only admins can access the `User` module:

```tsx
<Tushan dataProvider={dataProvider} authProvider={authProvider}>
  {({ permissions }) => (
    <>
      {permissions.includes('admin') && (
        <Resource
          name="users"
          label="User"
          icon={<IconUser />}
          list={
            <ListTable
              fields={userFields}
              action={{
                create: true,
                detail: true,
                edit: true,
                delete: true,
              }}
            />
          }
        />
      )}
    </>
  )}
</Tushan>
```

Or for more granular control, where everyone can view `users`, but only admins can add, edit, or delete:

```tsx
<Tushan dataProvider={dataProvider} authProvider={authProvider}>
  {({ permissions }) => (
    <>
      <Resource
        name="users"
        label="User"
        icon={<IconUser />}
        list={
          <ListTable
            fields={userFields}
            action={{
              create: permissions.includes('admin'),
              detail: true,
              edit: permissions.includes('admin'),
              delete: permissions.includes('admin'),
            }}
          />
        }
      />
    </>
  )}
</Tushan>
```

For custom components, you can use `usePermissions` to access permission data:

```tsx
import { usePermissions } from 'tushan';

export const MyComponent = () => {
  const { permissions } = usePermissions();

  if (!permissions.includes('admin')) {
    return null;
  }

  return <div>{/* ... */}</div>;
};
```

## Considerations

When `getPermissions` fails to retrieve permissions correctly, it should throw an exception or return `null`, rather than an empty array or another non-permission state.

`Tushan` checks permissions before and after login. If pre-login permissions are correctly returned, it will not fetch them again post-login.
