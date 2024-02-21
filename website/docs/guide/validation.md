---
sidebar_position: 9
title: Input Validation
---

Input validation is a crucial aspect of form handling, and thus `Tushan` naturally provides built-in functionality for input validation.

Take email verification as an example:

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

Validation rules can be defined under `edit.rules`, and the specific syntax can be referred to: [https://arco.design/react/components/form#api](https://arco.design/react/components/form#api)

> Notably, if the rules include `required: true`, an "*" will be appended to the form item label.

For some common validation rules, `tushan` has already built-in implementations, such as the email verification implementation below:
```tsx
import { FieldValidator } from 'tushan';

const emailRE = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_\-]+)+$/;

export const emailValidator: FieldValidator = (value, cb) => {
  if (typeof value === 'string') {
    if (emailRE.test(value)) {
      cb();
    } else {
      cb('Not a valid email');
    }
  } else {
    cb(`Value type must be string, currently: ${typeof value}`);
  }
};
```
