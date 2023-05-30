import { Input, Typography } from '@arco-design/web-react';
import React from 'react';
import { useViewTypeContext } from '../../context/viewtype';
import { normalizeText } from '../../utils/common';
import { createFieldFactory } from './factory';
import type { FieldDetailComponent, FieldEditComponent } from './types';

export const TextAreaFieldDetail: FieldDetailComponent<string> = React.memo(
  (props) => {
    const viewType = useViewTypeContext();
    const text = normalizeText(props.value);

    if (viewType === 'list') {
      return (
        <Typography.Text
          ellipsis={{
            /**
             * If ellipsis is enabled for the table, apply css ellipsis to optimize performance. Otherwise, use js dichotomy to omit to ensure correct style
             *
             * If column not set width, use cssEllipsis to avoid constant jittering in js calculations
             */
            cssEllipsis:
              props.options.list?.ellipsis === true ||
              props.options.list?.width === undefined
                ? true
                : false,
            showTooltip: true,
          }}
        >
          {text}
        </Typography.Text>
      );
    }

    return (
      <Typography.Text
        ellipsis={{ cssEllipsis: true, rows: 5, expandable: true }}
      >
        {text}
      </Typography.Text>
    );
  }
);
TextAreaFieldDetail.displayName = 'TextAreaFieldDetail';

export const TextAreaFieldEdit: FieldEditComponent<string> = React.memo(
  (props) => {
    return (
      <Input.TextArea
        placeholder={props.options.edit?.placeholder ?? props.options.label}
        value={normalizeText(props.value)}
        onChange={(val) => props.onChange(val)}
      />
    );
  }
);
TextAreaFieldEdit.displayName = 'TextAreaFieldEdit';

export const createTextAreaField = createFieldFactory({
  detail: TextAreaFieldDetail,
  edit: TextAreaFieldEdit,
});
