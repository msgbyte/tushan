import React from 'react';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';
import { BasicRecord } from '../../api';
import { useRecordContext } from '../../context/record';

export interface CustomFieldOptions {
  render: (value: unknown, record: BasicRecord) => React.ReactNode;
  editRender?: (
    value: unknown,
    onChange: (val: unknown) => void,
    record: BasicRecord
  ) => React.ReactNode;
}

export const CustomFieldDetail: FieldDetailComponent<
  unknown,
  CustomFieldOptions
> = React.memo((props) => {
  const record = useRecordContext();

  return <>{props.options.render?.(props.value, record) ?? null}</>;
});
CustomFieldDetail.displayName = 'CustomFieldDetail';

export const CustomFieldEdit: FieldEditComponent<unknown, CustomFieldOptions> =
  React.memo((props) => {
    const record = useRecordContext();

    return (
      <>
        {props.options.editRender?.(props.value, props.onChange, record) ??
          props.options.render?.(props.value, record) ??
          null}
      </>
    );
  });
CustomFieldEdit.displayName = 'CustomFieldEdit';

export const createCustomField = createFieldFactory({
  detail: CustomFieldDetail,
  edit: CustomFieldEdit,
});
