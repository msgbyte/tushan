import { Input } from '@arco-design/web-react';
import React from 'react';
import { normalizeText } from '../../utils/common';
import { createFieldFactory } from './factory';
import { TextFieldDetail } from './text';
import type { FieldEditComponent } from './types';

export const PasswordFieldEdit: FieldEditComponent<string> = React.memo(
  (props) => {
    return (
      <Input.Password
        placeholder={props.options.edit?.placeholder ?? props.options.label}
        value={normalizeText(props.value)}
        onChange={(val) => props.onChange(val)}
      />
    );
  }
);
PasswordFieldEdit.displayName = 'PasswordFieldEdit';

export const createPasswordField = createFieldFactory({
  detail: TextFieldDetail,
  edit: PasswordFieldEdit,
});
