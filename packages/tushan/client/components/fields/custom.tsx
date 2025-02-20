import React from 'react';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';

export interface CustomFieldOptions {
  render: (value: unknown) => React.ReactNode;
  editRender?: (
    value: unknown,
    onChange: (val: unknown) => void
  ) => React.ReactNode;
}

export const CustomFieldDetail: FieldDetailComponent<
  unknown,
  CustomFieldOptions
> = React.memo((props) => {
  return <>{props.options.render?.(props.value) ?? null}</>;
});
CustomFieldDetail.displayName = 'CustomFieldDetail';

export const CustomFieldEdit: FieldEditComponent<unknown, CustomFieldOptions> =
  React.memo((props) => {
    return (
      <>
        {props.options.editRender?.(props.value, props.onChange) ??
          props.options.render?.(props.value) ??
          null}
      </>
    );
  });
CustomFieldEdit.displayName = 'CustomFieldEdit';

export const createCustomField = createFieldFactory({
  detail: CustomFieldDetail,
  edit: CustomFieldEdit,
});
