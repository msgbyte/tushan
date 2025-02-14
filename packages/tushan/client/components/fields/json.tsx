import { Button, Popover } from '@arco-design/web-react';
import React from 'react';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';
import { useViewTypeContext } from '../../context/viewtype';
import { JSONView } from '../JSONView';

function getObjectSize(obj: any): number {
  if (!obj) {
    return 0;
  }

  if (Array.isArray(obj)) {
    return obj.length;
  } else if (typeof obj === 'object') {
    return Object.keys(obj).length;
  } else {
    return String(obj).length;
  }
}

export const JSONFieldDetail: FieldDetailComponent<object> = React.memo(
  (props) => {
    const viewType = useViewTypeContext();

    if (viewType === 'list') {
      return (
        <Popover trigger="click" content={<JSONView data={props.value} />}>
          <Button size="small">
            Show (size: {getObjectSize(props.value)})
          </Button>
        </Popover>
      );
    } else {
      return <JSONView data={props.value} />;
    }
  }
);
JSONFieldDetail.displayName = 'JSONFieldDetail';

export const JSONFieldEdit: FieldEditComponent<object> = React.memo((props) => {
  return (
    <JSONView
      data={props.value}
      options={{
        onEdit: (edit) => props.onChange(edit.updated_src),
      }}
    />
  );
});
JSONFieldEdit.displayName = 'JSONFieldEdit';

export const createJSONField = createFieldFactory({
  detail: JSONFieldDetail,
  edit: JSONFieldEdit,
});
