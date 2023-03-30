import { Form } from '@arco-design/web-react';
import React, { useMemo, useState } from 'react';
import { FieldHandler } from '../field/factory';

export interface EditFormProps {
  fields: FieldHandler[];
}
export const EditForm: React.FC<EditFormProps> = React.memo((props) => {
  const [values, setValues] = useState({}); // TODO

  const items = useMemo(() => {
    return props.fields.map((handler) => handler('edit'));
  }, [props.fields]);

  return (
    <Form>
      {items.map((item) => (
        <Form.Item label={item.title}>
          {item.render(values[item.source], (val) => {
            setValues((state) => ({
              ...state,
              [item.source]: val,
            }));
          })}
        </Form.Item>
      ))}
    </Form>
  );
});
EditForm.displayName = 'EditForm';
