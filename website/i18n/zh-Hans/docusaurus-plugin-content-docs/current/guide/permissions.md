---
sidebar_position: 11
title: 权限控制与RBAC
---

一般来说我们会把 `Tushan` 作为快速构建应用的一种解决方案，在最初应当是只有一种完全控制权限场景。

但是在后续的迭代中，随着项目的变大，内容与管理员会变得更加复杂，因此我们需要对权限进行细分控制。

`Tushan` 提供了一个内置的权限控制模块，在 authProvider 中，即登录成功后，我们可以定义 `getPermissions` 来控制我们如何拿到权限。这里的函数返回的是一个 promise，意味着我们也可以通过二次请求获取权限。也可以在登录完毕后从请求的返回值获取。

```tsx
export const authProvider: AuthProvider = {
  // ....
  getPermissions: () => Promise.resolve(''),
};
```

你可以在`getPermissions`中返回任意结果，因为`Tushan`并不会对其内容进行处理而是原样返回给用户自身

## 基于角色的权限控制

比如你可以在`getPermissions` 返回一组数组作为用户角色

```tsx
export const authProvider: AuthProvider = {
  // ....
  getPermissions: () => Promise.resolve(['admin', 'user']), // 这是一个demo, 真实的内容可以从token中获取或者从接口中获取
};
```

然后在资源定义的地方对其进行控制，比如我们假设只有管理员权限才能显示 `User` 模块，示例如下:

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

或者我们可以进行更加细粒度的权限控制, 如所有人都能看到`user`权限，但是只有管理员才能增删改。

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

对于自定义组件，你可以使用 `usePermissions` 来获取权限内容:

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

## 注意事项

当`getPermissions`无法正确获取到权限时，应当抛出一个异常或者返回`null`，而不是空数组或者其他的无权限状态。

因为`Tushan`会在登录前和登录后分别检查一次，如果登录前的权限能够正常返回内容，则登录后就不会重复获取。
