import React from 'react';
import { Input, Form } from '@arco-design/web-react';
import type { FastifyFormFieldComponent } from 'react-fastify-form';
import { getValidateStatus } from '../utils';

export const FastifyFormPassword: FastifyFormFieldComponent = React.memo(
  (props) => {
    const {
      name,
      label,
      required,
      value,
      onChange,
      error,
      maxLength,
      placeholder,
    } = props;

    return (
      <Form.Item
        label={label}
        validateStatus={getValidateStatus(error)}
        help={error}
        required={required}
      >
        <Input.Password
          name={name}
          type="password"
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
FastifyFormPassword.displayName = 'FastifyFormPassword';
