---
sidebar_position: 1
title: Authentication
---

In over 90% of cases, a backend service requires authentication, especially since most backend operations directly manipulate the database. Naturally, `tushan` provides a well-packaged login logic.

You need to prepare an `authProvider` to inform `tushan` how to handle the login process.

```tsx
<Tushan
  authProvider={authProvider}
>
</Tushan>
```

![](/img/docs/misc/login.png)

The interface definition for `authProvider` is as follows:

```tsx
import { AuthProvider  } from 'tushan';

const authProvider: AuthProvider = {
  login: params => Promise.resolve(/* ... */),
  checkError: error => Promise.resolve(/* ... */),
  checkAuth: params => Promise.resolve(/* ... */),
  logout: () => Promise.resolve(/* ... */),
  getIdentity: () => Promise.resolve(/* ... */),
  handleCallback: () => Promise.resolve(/* ... */), // for OAuth2
  getPermissions: () => Promise.resolve(/* ... */),
};
```

## Quick Start

`Tushan` also offers a built-in generic authentication creation function.

```tsx
import { AuthProvider, createAuthProvider } from 'tushan';

const authProvider: AuthProvider = createAuthProvider({
  loginUrl: '/api/login',
});
```

The configuration parameter `loginUrl` indicates the URL address of the login interface.

The specific backend login logic needs to be implemented on your own. The interface should return the following content:
```json
{
  "username": "string",
  "token": "string", // for inclusion in subsequent request headers
  "expiredAt": "number" // timestamp
}
```

The returned content will be stored in localStorage under `authStorageKey` (default is "tushan:auth"). You can retrieve the `token` from there for inclusion in the headers of subsequent HTTP requests.

Correspondingly, you can use the `createAuthHttpClient` function to create a `httpClient` that includes the token in requests.

```tsx
const dataProvider = jsonServerProvider(
  config.dataProvider.url,
  createAuthHttpClient()
)
```

## Including Token in Requests

To include the token in requests, you need to modify the request function used for sending requests.

Here is a simple example:

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

`fetchJSON` is a simple wrapper around the native `fetch` method.

## Node Example

### Login

Here is an example of a login middleware for a Node Express service. Implementations in other languages can be adapted accordingly.

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
    // Username and password are correct, return a token
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

This defines a `/api/login` interface that performs a simple check of the username and password. If they match, a JWT token is issued, and the relevant information is returned to the frontend.

### Authentication

Here is an example of an authentication middleware for a Node Express service. Implementations in other languages can be adapted accordingly.

```ts
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const adminAuth = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS,
};

const authSecret = 'any-string';

export function auth() {
  return (req: Request, res:

 Response, next: NextFunction) => {
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

This uses a single-user mode, retrieving the username and password from environment variables. It then verifies the `token` carried in the request `Header` with the server's secret key using JWT, ensuring the user's `token` is valid.

Requests can be authenticated as follows:

```ts
router.use(
  '/users',
  auth(),
  (req, res) => {
    // ....
  }
);
```
