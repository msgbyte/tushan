import React from 'react';
import { Form, Checkbox } from '@arco-design/web-react';
import type { FastifyFormFieldComponent } from 'react-fastify-form';
import { getValidateStatus } from '../utils';

export const FastifyFormCheckbox: FastifyFormFieldComponent = React.memo(
  (props) => {
    const { name, label, required, value, onChange, error } = props;

    return (
      <Form.Item
        label={label}
        validateStatus={getValidateStatus(error)}
        help={error}
        required={required}
      >
        <Checkbox
          checked={Boolean(value)}
          onChange={(checked) => onChange(checked)}
        >
          {label}
        </Checkbox>
      </Form.Item>
    );
  }
);
FastifyFormCheckbox.displayName = 'FastifyFormCheckbox';
