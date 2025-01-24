import { Select, Tag } from '@arco-design/web-react';
import React from 'react';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';

export type SelectFieldOptionValueType = string | number;

export interface SelectFieldOptionItem {
  value: SelectFieldOptionValueType;

  label?: string;

  /**
   * Use in detail mode
   */
  color?: string;
  /**
   * Use in detail mode
   */
  icon?: string;
}

export interface SelectFieldOptions {
  items: SelectFieldOptionItem[];
  allowClear?: boolean;
}

export const SelectFieldDetail: FieldDetailComponent<
  SelectFieldOptionValueType,
  SelectFieldOptions
> = React.memo((props) => {
  const items = props.options.items ?? [];

  const selectedOption = items.find((item) => item.value === props.value);

  if (selectedOption) {
    return (
      <Tag color={selectedOption.color} icon={selectedOption.icon}>
        {selectedOption.label ?? selectedOption.value}
      </Tag>
    );
  } else {
    return <Tag>{props.value}</Tag>;
  }
});
SelectFieldDetail.displayName = 'SelectFieldDetail';

export const SelectFieldEdit: FieldEditComponent<
  SelectFieldOptionValueType,
  SelectFieldOptions
> = React.memo((props) => {
  const items = props.options.items ?? [];
  const allowClear = props.options.allowClear ?? false;

  return (
    <Select
      placeholder={props.options.edit?.placeholder ?? props.options.label}
      allowClear={allowClear}
      value={props.value}
      onChange={(val) => props.onChange(val)}
    >
      {items.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {item.label ?? item.value}
        </Select.Option>
      ))}
    </Select>
  );
});
SelectFieldEdit.displayName = 'SelectFieldEdit';

/**
 * @example
 * createSelectField('Class', {
 *   items: [
 *     {
 *       value: 'A',
 *       label: 'Class A',
 *       color: 'red',
 *     },
 *     {
 *       value: 'B',
 *       label: 'Class B',
 *       color: 'green',
 *     },
 *   ],
 * }),
 */
export const createSelectField = createFieldFactory<SelectFieldOptions>({
  detail: SelectFieldDetail,
  edit: SelectFieldEdit,
});
