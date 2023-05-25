import { Button, Form, Message, Space } from '@arco-design/web-react';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { BasicRecord } from '../../api';
import { useCreate } from '../../api/useCreate';
import { useUpdate } from '../../api/useUpdate';
import { useResourceContext } from '../../context/resource';
import { ViewTypeContextProvider } from '../../context/viewtype';
import { useSendRequest } from '../../hooks/useSendRequest';
import type { FieldHandler } from '../fields/factory';
import { SubmitButton } from '../SubmitButton';

export interface EditFormProps {
  fields: FieldHandler[];
  record: BasicRecord | null; // edit or create
  onSuccess?: (values: BasicRecord) => void;
  onCancel?: () => void;
}
export const EditForm: React.FC<EditFormProps> = React.memo((props) => {
  const isCreate = props.record === null;
  const defaultValues = props.record ?? ({} as BasicRecord);
  const [form] = Form.useForm();
  const [create] = useCreate();
  const [updateOne] = useUpdate();
  const resource = useResourceContext();
  const { t } = useTranslation();

  const items = useMemo(() => {
    return props.fields
      .map((handler) => handler('edit'))
      .filter((item) => !item.hidden);
  }, [props.fields]);

  const handleSubmit = useSendRequest(async () => {
    try {
      const values = form.getFieldsValue();

      await form.validate();

      if (isCreate) {
        await create(resource, {
          data: { ...values },
        });
      } else {
        if (!defaultValues.id) {
          Message.error('Cannot update record, not found id');
          return;
        }
        await updateOne(resource, {
          id: defaultValues.id,
          data: { ...values },
        });
      }

      props.onSuccess?.(values as BasicRecord);
      Message.success(t('tushan.common.operateSuccess') ?? '');
    } catch (err) {
      Message.error(t('tushan.common.operateFailed') + ':' + String(err));
    }
  });

  return (
    <ViewTypeContextProvider viewType="edit">
      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onFocus']}
        initialValues={defaultValues}
      >
        {items.map((item, i) => {
          if (item.source === 'id') {
            // Dont render id field
            return null;
          }

          return (
            <Form.Item
              key={`${item.source}#${i}`}
              label={item.title}
              field={item.source}
              rules={item.rules}
            >
              {(formData, form) =>
                item.render(formData[item.source], (val) => {
                  form.setFieldValue(item.source, val);
                })
              }
            </Form.Item>
          );
        })}

        <Form.Item>
          <Space>
            <SubmitButton type="primary" onClick={handleSubmit}>
              {isCreate ? t('tushan.edit.create') : t('tushan.edit.save')}
            </SubmitButton>
            <Button type="default" onClick={props.onCancel}>
              {t('tushan.edit.cancel')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </ViewTypeContextProvider>
  );
});
EditForm.displayName = 'EditForm';
