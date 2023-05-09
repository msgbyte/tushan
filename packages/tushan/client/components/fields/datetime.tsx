import { DatePicker, Input, TimePicker } from '@arco-design/web-react';
import React from 'react';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';

export type DateTimeFieldValueType = string | number;

export interface DateTimeFieldOptions {
  format: 'iso' | 'unix';
}

export const DateTimeFieldDetail: FieldDetailComponent<
  DateTimeFieldValueType,
  DateTimeFieldOptions
> = React.memo((props) => {
  return <span>{new Date(props.value).toLocaleString()}</span>;
});
DateTimeFieldDetail.displayName = 'DateTimeFieldDetail';

export const DateTimeFieldEdit: FieldEditComponent<
  DateTimeFieldValueType,
  DateTimeFieldOptions
> = React.memo((props) => {
  return (
    <DatePicker
      placeholder={props.options.edit?.placeholder ?? props.options.label}
      value={new Date(props.value)}
      onChange={(_, date) => {
        const format = props.options.format ?? 'iso';

        if (format === 'iso') {
          props.onChange(date.toISOString());
        } else if (format === 'unix') {
          props.onChange(date.unix());
        }
      }}
      showTime={true}
    />
  );
});
DateTimeFieldEdit.displayName = 'DateTimeFieldEdit';

export const createDateTimeField = createFieldFactory<DateTimeFieldOptions>({
  detail: DateTimeFieldDetail,
  edit: DateTimeFieldEdit,
});
