import React from 'react';
import { Input, Form } from '@arco-design/web-react';
import type { FastifyFormFieldComponent } from 'react-fastify-form';
import { getValidateStatus } from '../utils';

export const FastifyFormTextArea: FastifyFormFieldComponent = React.memo(
  (props) => {
    const {
      name,
      label,
      value,
      onChange,
      error,
      required,
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
        <Input.TextArea
          name={name}
          rows={4}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={(val) => onChange(val)}
        />
      </Form.Item>
    );
  }
);
FastifyFormTextArea.displayName = 'FastifyFormTextArea';
