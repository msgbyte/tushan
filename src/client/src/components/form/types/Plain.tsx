import React from 'react';
import { Input, Form } from '@arco-design/web-react';
import type { FastifyFormFieldComponent } from 'react-fastify-form';
import { getValidateStatus } from '../utils';

/**
 * 用于Detail
 */
export const FastifyFormPlain: FastifyFormFieldComponent = React.memo(
  (props) => {
    const { label, value, onChange, error, required, placeholder } = props;

    return (
      <Form.Item
        label={label}
        validateStatus={getValidateStatus(error)}
        help={error}
        required={required}
      >
        <div>{value}</div>
      </Form.Item>
    );
  }
);
FastifyFormPlain.displayName = 'FastifyFormPlain';
