import { Form } from '@arco-design/web-react';
import React, { useMemo } from 'react';
import type { BasicRecord } from '../../api/types';
import { RecordContextProvider } from '../../context/record';
import { ViewTypeContextProvider } from '../../context/viewtype';
import type { FieldHandler } from '../fields/factory';

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
    <ViewTypeContextProvider viewType="detail">
      <RecordContextProvider record={props.record}>
        <Form>
          {items.map((item) => (
            <Form.Item key={item.source} label={item.title}>
              {item.render(props.record[item.source])}
            </Form.Item>
          ))}
        </Form>
      </RecordContextProvider>
    </ViewTypeContextProvider>
  );
});
DetailForm.displayName = 'DetailForm';
