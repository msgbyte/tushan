---
sidebar_position: 9
title: 输入校验
---

在表单中输入校验是非常重要的一环，因此在`Tushan`中当然也提供了内置的输入校验功能。

以一个邮箱认证为例:

```tsx
import {
  createEmailField,
  emailValidator,
} from 'tushan';

const userFields = [
  // ...
  createEmailField('email', {
    edit: {
      rules: [
        {
          required: true,
        },
        {
          validator: emailValidator,
        },
      ],
    },
  }),
  // ...
]
```

![](/img/docs/misc/validate.png)

在 `edit.rules` 下可以定义校验规则，具体的语法可以参考: [https://arco.design/react/components/form#api](https://arco.design/react/components/form#api)

> 特殊的, 如果规则中包含了 `required: true` 则会在表单项标签中追加 "*"。

对于一些常见的校验规则，`tushan`已经内置了相关实现，如邮件认证的实现如下：
```tsx
import { FieldValidator } from 'tushan';

const emailRE = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_\-]+)+$/;

export const emailValidator: FieldValidator = (value, cb) => {
  if (typeof value === 'string') {
    if (emailRE.test(value)) {
      cb();
    } else {
      cb('Not a validate email');
    }
  } else {
    cb(`value type must be string, now: ${typeof value}`);
  }
};
```
