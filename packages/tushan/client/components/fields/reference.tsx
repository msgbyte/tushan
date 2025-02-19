import { Select } from '@arco-design/web-react';
import { get, isFunction } from 'lodash-es';
import React from 'react';
import { Identifier, useGetList } from '../../api';
import { useGetOne } from '../../api/useGetOne';
import { useDebounce } from '../../hooks/useDebounce';
import { useObjectState } from '../../hooks/useObjectState';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';

export interface ReferenceFieldOptions {
  reference: string;
  /**
   * Source Field for display
   */
  displayField: string | ((record: Record<string, any>) => React.ReactNode);
  /**
   * Field which define search filter in edit.
   *
   * @default "q"
   */
  searchField?: string;

  /**
   * @default false
   */
  allowClear?: boolean;
}

export const ReferenceFieldDetail: FieldDetailComponent<
  Identifier,
  ReferenceFieldOptions
> = React.memo((props) => {
  const options = props.options;
  const reference = options.reference ?? '';
  const displayField = options.displayField ?? '';
  const id = props.value;

  const { data } = useGetOne(reference, {
    id,
  });

  return (
    <span>
      {isFunction(displayField)
        ? displayField(data ?? {})
        : get(data, displayField)}
    </span>
  );
});
ReferenceFieldDetail.displayName = 'ReferenceFieldDetail';

export const ReferenceFieldEdit: FieldEditComponent<
  Identifier,
  ReferenceFieldOptions
> = React.memo((props) => {
  const reference = props.options.reference ?? '';
  const displayField = props.options.displayField ?? '';
  const searchField = props.options.searchField ?? 'q';
  const allowClear = props.options.allowClear ?? false;
  const [filterValues, setFilterValues] = useObjectState({});
  const lazyFilter = useDebounce(filterValues, { wait: 500 });

  const { data = [] } = useGetList(reference, {
    pagination: {
      page: 1,
      perPage: 10,
    },
    filter: lazyFilter,
  });

  return (
    <Select
      showSearch={true}
      filterOption={false}
      onSearch={(value) => setFilterValues({ [searchField]: value })}
      allowClear={allowClear}
      value={props.value}
      onChange={(val) => props.onChange(val)}
    >
      {data.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {isFunction(displayField)
            ? displayField(item ?? {})
            : get(item, displayField, item.id)}
        </Select.Option>
      ))}
    </Select>
  );
});
ReferenceFieldEdit.displayName = 'ReferenceFieldEdit';

export const createReferenceField = createFieldFactory<ReferenceFieldOptions>({
  detail: ReferenceFieldDetail,
  edit: ReferenceFieldEdit,
});
