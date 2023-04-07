import { Input } from '@arco-design/web-react';
import React from 'react';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';

export const TextFieldDetail: FieldDetailComponent<string> = React.memo(
  (props) => {
    return <span>{props.value}</span>;
  }
);
TextFieldDetail.displayName = 'TextFieldDetail';

export const TextFieldEdit: FieldEditComponent<string> = React.memo((props) => {
  return <Input value={props.value} onChange={(val) => props.onChange(val)} />;
});
TextFieldEdit.displayName = 'TextFieldEdit';

export const createTextField = createFieldFactory({
  detail: TextFieldDetail,
  edit: TextFieldEdit,
});
