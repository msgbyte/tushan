import { Form } from '@arco-design/web-react';
import React, { useMemo } from 'react';
import type { BasicRecord } from '../../api/types';
import type { FieldHandler } from '../field/factory';

export interface DetailFormProps {
  record: BasicRecord;
  fields: FieldHandler[];
}
export const DetailForm: React.FC<DetailFormProps> = React.memo((props) => {
  const items = useMemo(() => {
    return props.fields
      .map((handler) => handler('detail'))
      .filter((item) => !item.hidden);
  }, [props.fields]);

  return (
    <Form>
      {items.map((item) => (
        <Form.Item key={item.source} label={item.title}>
          {item.render(props.record[item.source])}
        </Form.Item>
      ))}
    </Form>
  );
});
DetailForm.displayName = 'DetailForm';
