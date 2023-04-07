import { Button, Form, Message, Space } from '@arco-design/web-react';
import React, { useMemo, useState } from 'react';
import type { BasicRecord } from '../../api';
import { useUpdate } from '../../api/useUpdate';
import { useResourceContext } from '../../context/resource';
import { useSendRequest } from '../../hooks/useSendRequest';
import type { FieldHandler } from '../field/factory';
import { SubmitButton } from '../SubmitButton';

export interface EditFormProps {
  fields: FieldHandler[];
  record: BasicRecord;
  onSuccess?: (values: BasicRecord) => void;
  onCancel?: () => void;
}
export const EditForm: React.FC<EditFormProps> = React.memo((props) => {
  const [values, setValues] = useState<BasicRecord>(props.record);
  const [update] = useUpdate();
  const resource = useResourceContext();

  const items = useMemo(() => {
    return props.fields.map((handler) => handler('edit'));
  }, [props.fields]);

  const handleSubmit = useSendRequest(async () => {
    try {
      await update(resource, { ...values });

      props.onSuccess?.(values);
    } catch (err) {
      Message.error(String(err));
    }
  });

  return (
    <Form layout="vertical">
      {items.map((item, i) => {
        if (item.source === 'id') {
          // Dont render id field
          return null;
        }

        return (
          <Form.Item key={item.source} label={item.title}>
            {item.render(values[item.source], (val) => {
              setValues((state) => ({
                ...state,
                [item.source]: val,
              }));
            })}
          </Form.Item>
        );
      })}

      <Form.Item>
        <Space>
          <SubmitButton type="primary" onClick={handleSubmit}>
            Save
          </SubmitButton>
          <Button type="default" onClick={props.onCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
});
EditForm.displayName = 'EditForm';
