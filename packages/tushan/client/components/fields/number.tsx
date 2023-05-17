import { InputNumber } from '@arco-design/web-react';
import React from 'react';
import { createFieldFactory } from './factory';
import { TextFieldDetail } from './text';
import type { FieldEditComponent } from './types';

export const NumberFieldEdit: FieldEditComponent<number> = React.memo(
  (props) => {
    return (
      <InputNumber
        placeholder={props.options.edit?.placeholder ?? props.options.label}
        value={Number(props.value)}
        onChange={(val) => props.onChange(val)}
      />
    );
  }
);
NumberFieldEdit.displayName = 'NumberFieldEdit';

export const createNumberField = createFieldFactory({
  detail: TextFieldDetail,
  edit: NumberFieldEdit,
});
