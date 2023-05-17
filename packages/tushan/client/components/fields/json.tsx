import { Button, Popover } from '@arco-design/web-react';
import React from 'react';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';
import ReactJson, { ReactJsonViewProps } from 'react-json-view';
import { useViewTypeContext } from '../../context/viewtype';

const defaultJSONViewProps: Partial<ReactJsonViewProps> = {
  name: false,
  displayDataTypes: false,
  iconStyle: 'square',
};

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
        <Popover
          trigger="click"
          content={<ReactJson {...defaultJSONViewProps} src={props.value} />}
        >
          <Button size="small">
            Show (size: {getObjectSize(props.value)})
          </Button>
        </Popover>
      );
    } else {
      return <ReactJson {...defaultJSONViewProps} src={props.value} />;
    }
  }
);
JSONFieldDetail.displayName = 'JSONFieldDetail';

export const JSONFieldEdit: FieldEditComponent<object> = React.memo((props) => {
  return (
    <ReactJson
      {...defaultJSONViewProps}
      src={props.value}
      onEdit={(edit) => props.onChange(edit.updated_src)}
    />
  );
});
JSONFieldEdit.displayName = 'JSONFieldEdit';

export const createJSONField = createFieldFactory({
  detail: JSONFieldDetail,
  edit: JSONFieldEdit,
});
