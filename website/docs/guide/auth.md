---
sidebar_position: 1
title: 登录鉴权
---

一个后台服务在 90% 以上的场景都是需要登录鉴权的，毕竟在大多数情况下我们的后台操作是直接操作数据库的。而在 `tushan` 中我们自然提供了封装好的登录逻辑。

我们需要准备 `authProvider` 来告诉 `tushan` 我们要如何处理登录的流程。

```tsx
<Tushan
  authProvider={authProvider}
>
</Tushan>
```

其中 `authProvider` 的接口定义如下:

```tsx
import { AuthProvider  } from 'tushan';

const authProvider: AuthProvider = {
  login: params => Promise.resolve(/* ... */),
  checkError: error => Promise.resolve(/* ... */),
  checkAuth: params => Promise.resolve(/* ... */),
  logout: () => Promise.resolve(/* ... */),
  getIdentity: () => Promise.resolve(/* ... */),
  handleCallback: () => Promise.resolve(/* ... */), // for 
  getPermissions: () => Promise.resolve(/* ... */),
};
```


## 快速开始

`Tushan` 也提供了一个内置的通用鉴权创建函数

```tsx
import { createAuthProvider } from 'tushan';

const authProvider: AuthProvider = createAuthProvider({
  loginUrl: '/api/login',
});
```

其中配置参数 `loginUrl` 表示登录接口url地址。

具体的后端登录逻辑需要自行实现。接口需要返回如下内容:
```tsx
{
  username: string;
  token: string; // 发送请求时可以携带
  expiredAt: number; // timestamp
}
```

返回的内容会记录在 `authStorageKey`(默认"tushan:auth") 指定的 localStorage 中。你可以在后续的网络请求中获取`token`并在发送的请求头中携带。

## 请求携带Token

为了使请求能够携带Token, 我们需要修改一下发送请求时请求函数。

一个简单的示例如下:

```ts
import { fetchJSON } from 'tushan';

const authStorageKey = 'tushan:auth';

const httpClient: typeof fetchJSON = (url, options = {}) => {
  try {
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }
    const { token } = JSON.parse(
      window.localStorage.getItem(authStorageKey) ?? '{}'
    );
    (options.headers as Headers).set('Authorization', `Bearer ${token}`);

    return fetchJSON(url, options);
  } catch (err) {
    return Promise.reject();
  }
};

const dataProvider = jsonServerProvider('/admin/api', httpClient);
```

其中 `fetchJSON` 是对原生`fetch`方法的简单封装。

## node 示例

### 登录

以下是一个登录的node express服务的中间件的示例，其他语言的实现可以自行参考

```ts
const adminAuth = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS,
};

router.post('/api/login', (req, res) => {
  if (!adminAuth.username || !adminAuth.password) {
    res.status(401).end('Server not set env: ADMIN_USER, ADMIN_PASS');
    return;
  }

  const { username, password } = req.body;

  if (username === adminAuth.username && password === adminAuth.password) {
    // 用户名和密码都正确，返回token
    const token = jwt.sign(
      {
        username,
        platform: 'admin',
      },
      authSecret,
      {
        expiresIn: '2h',
      }
    );

    res.json({
      username,
      token: token,
      expiredAt: new Date().valueOf() + 2 * 60 * 60 * 1000,
    });
  } else {
    res.status(401).end('username or password incorrect');
  }
});
```

在这里我们定义了一个`/api/login`接口，对账号和密码进行简单比较，如果账号密码都匹配则进行签发 jwt Token, 并将相关信息返回给前端

### 鉴权

以下是一个鉴权的node express服务的中间件的示例，其他语言的实现可以自行参考

```ts
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

const adminAuth = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS,
};

const authSecret = 'any-string';

export function auth() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        res.status(401).end('not found authorization in headers');
        return;
      }

      const token = authorization.slice('Bearer '.length);

      const payload = jwt.verify(token, authSecret);
      if (typeof payload === 'string') {
        res.status(401).end('payload type error');
        return;
      }
      if (payload.platform !== 'admin') {
        res.status(401).end('Payload invalid');
        return;
      }

      next();
    } catch (err) {
      res.status(401).end(String(err));
    }
  };
}
```

这里使用了单用户模式，从环境变量中拿到了用户名和密码。然后将请求 `Header` 中携带的 `token` 与服务端记录的秘钥进行一次 jwt 的验证，以确保用户的 `token` 合法的

我们可以通过如下的使用方式来对请求进行鉴权校验

```ts
router.use(
  '/users',
  auth(),
  (req, res) => {
    // ....
  }
);
```
