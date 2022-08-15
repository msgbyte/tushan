import React, { useEffect, useMemo } from 'react';
import {
  FastifyForm,
  regField,
  regFormContainer,
  FastifyFormContainerProps,
  useFastifyFormContext,
  FastifyFormInstance,
  FastifyFormProps,
} from 'react-fastify-form';
import { Form, Button } from '@arco-design/web-react';
import { FastifyFormText } from './types/Text';
import { FastifyFormTextArea } from './types/TextArea';
import { FastifyFormPassword } from './types/Password';
import { FastifyFormSelect } from './types/Select';
import { FastifyFormCheckbox } from './types/Checkbox';
import { FastifyFormCustom } from './types/Custom';
import { FastifyFormNumber } from './types/Number';
import { FastifyFormPlain } from './types/Plain';

regField('plain', FastifyFormPlain);
regField('text', FastifyFormText);
regField('textarea', FastifyFormTextArea);
regField('password', FastifyFormPassword);
regField('number', FastifyFormNumber);
regField('select', FastifyFormSelect);
regField('checkbox', FastifyFormCheckbox);
regField('custom', FastifyFormCustom);

interface FastifyFormContainerExtraProps {
  hiddenSubmit?: boolean;
  onFormMount?: (form: FastifyFormInstance) => void;
}

const FastifyFormContainer: React.FC<
  FastifyFormContainerProps<FastifyFormContainerExtraProps>
> = React.memo((props) => {
  const layout = props.layout;
  const hiddenSubmit: boolean = props.extraProps?.hiddenSubmit ?? false;
  const form = useFastifyFormContext();

  useEffect(() => {
    if (form) {
      props.extraProps?.onFormMount?.(form);
    }
  }, []);

  const submitButtonRender = useMemo(() => {
    return (
      <Form.Item
        wrapperCol={
          layout === 'vertical'
            ? { xs: 24 }
            : { sm: 24, md: { span: 16, offset: 8 } }
        }
      >
        <Button
          loading={props.loading}
          type="primary"
          size="large"
          htmlType="button"
          style={{ width: '100%' }}
          onClick={() => props.handleSubmit()}
          disabled={props.canSubmit === false}
        >
          {props.submitLabel ?? '提交'}
        </Button>
      </Form.Item>
    );
  }, [
    props.loading,
    props.handleSubmit,
    props.canSubmit,
    props.submitLabel,
    layout,
  ]);

  return (
    <Form
      layout={layout}
      labelCol={layout === 'vertical' ? { xs: 24 } : { sm: 24, md: 8 }}
      wrapperCol={layout === 'vertical' ? { xs: 24 } : { sm: 24, md: 16 }}
    >
      {props.children}
      {!hiddenSubmit && submitButtonRender}
    </Form>
  );
});
FastifyFormContainer.displayName = 'FastifyFormContainer';
regFormContainer(FastifyFormContainer);

export const WebFastifyForm = FastifyForm as <
  T extends Record<string, any> = {}
>(
  props: FastifyFormProps<T, FastifyFormContainerExtraProps>
) => React.ReactElement | null;
(WebFastifyForm as any).displayName = 'WebFastifyForm';
