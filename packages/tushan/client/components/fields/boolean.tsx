import { Switch } from '@arco-design/web-react';
import { IconCheck, IconClose } from '@arco-design/web-react/icon';
import React from 'react';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';

function isTrusty(input: any): boolean {
  return input === '1' || input === 'true' || input === 1 || input === true;
}

export const BooleanFieldDetail: FieldDetailComponent<string> = React.memo(
  (props) => {
    return <span>{isTrusty(props.value) ? <IconCheck /> : <IconClose />}</span>;
  }
);
BooleanFieldDetail.displayName = 'BooleanFieldDetail';

export const BooleanFieldEdit: FieldEditComponent<boolean> = React.memo(
  (props) => {
    return (
      <div>
        <Switch
          checked={isTrusty(props.value)}
          onChange={(val) => props.onChange(val)}
        />
      </div>
    );
  }
);
BooleanFieldEdit.displayName = 'BooleanFieldEdit';

export const createBooleanField = createFieldFactory({
  detail: BooleanFieldDetail,
  edit: BooleanFieldEdit,
});
