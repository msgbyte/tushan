import React from 'react';
import { Input, Form } from '@arco-design/web-react';
import type { FastifyFormFieldComponent } from 'react-fastify-form';
import { getValidateStatus } from '../utils';

export const FastifyFormText: FastifyFormFieldComponent = React.memo(
  (props) => {
    const { name, label, value, onChange, error, maxLength, placeholder } =
      props;

    return (
      <Form.Item
        label={label}
        validateStatus={getValidateStatus(error)}
        help={error}
      >
        <Input
          name={name}
          size="large"
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={(val) => onChange(val)}
        />
      </Form.Item>
    );
  }
);
FastifyFormText.displayName = 'FastifyFormText';
