---
sidebar_position: 2
title: Using Tushan in Laf
---

> `Laf` is a cloud development platform that integrates functions, databases, and storage.

We can quickly implement the backend management page for the `Laf` database using the preset libraries in `Tushan`, with only a simple configuration of the field list required to achieve rapid implementation of the backend management system.

## How to Use

### Start from the Function Market

You can quickly start from the Laf function market. After clicking "Use Template", you can quickly join your application.

![](/img/docs/misc/laf-func-market.png)

For the security of your database, please fill in a password and key with high randomness to prevent cracking.

### Manual Addition

Create an interceptor in your Laf application (named: `__interceptor__`).

Install the dependency `tushan-laf-json-server`, taking the latest version.

Start with the following content:

```tsx
import { createTushanJsonServerInterceptor } from 'tushan-laf-json-server'

export default async function (ctx: FunctionContext) {
  try {
    return await createTushanJsonServerInterceptor(ctx as any, {
      auth: {
        /**
         * Please modify the following three fields, which are the username, password, and secret key signature fields of the backend.
         */
        username: 'tushan',
        password: "tushan",
        secret: "tushan-secret"
      },
      config: {
        /**
         * The following are the names and types of the database models and corresponding fields.
         * Types include: text, number, avatar, json, boolean, datetime, password, select, reference, textarea, email, image, url
         * 
         * action indicates whether to enable the corresponding function. By default, only the list page is available.
         */
        resources: [
          {
            name: "test",
            fields: [
              {
                name: "id",
                type: "text"
              },
              {
                name: "content",
                type: "textarea",
              }
            ],
            action: {
              create: true,
              detail: true,
              edit: true,
              delete: true
            }
          }
        ]
      }
    });
  } catch (err) {
    console.error(err)
  } finally {
    return true;
  }
}
```

## Configuration Explanation

In `createTushanJsonServerInterceptor`, two parameters are required: the http request context `ctx` and the configuration options required by `tushan`.

We mainly explain the configuration:

- `header`: Title
- `footer`: Footer
- `auth`: Authentication-related
  - `username`: Backend username
  - `password`: Backend password
  - `secret`: Secret key used to generate tokens, a random string is sufficient
- `resources`: An array for describing configured resources
  - `name`: Model name, corresponding to the Laf dataset name
  - `label`: Display name, optional
  - `fields`: Model fields, an array
    - `name`: Field name
    - `type`: Field type, internally supports text, number, avatar, json, boolean, datetime, password, select, reference, textarea, email, image, url
    - `options`: Field configuration, optional, refer to the usage of `tushan` field configuration
  - `filter`: Filter options, configured the same as `fields`
  - `action`: Enabled functions
    - `create`: Create
    - `detail`: Detail
    - `edit`: Edit
    - `delete`: Delete
- `authProvider`: Optional, if you want to implement your own login authentication logic, you can override it
- `dataProvider`: Optional, if you want to implement your own resource acquisition logic, you can override it

## Accessing the Backend

After deployment, access `https://tushan-lite.msgbyte.com/?config=https://<appid>.laf.dev/tushan`, replacing `<appid>` with the `appid` of your own `Laf` application.
