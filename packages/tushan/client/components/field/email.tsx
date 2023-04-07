import { Link } from '@arco-design/web-react';
import { IconEmail } from '@arco-design/web-react/icon';
import React from 'react';
import { createFieldFactory } from './factory';
import { TextFieldEdit } from './text';
import type { FieldDetailComponent } from './types';

export const EmailFieldDetail: FieldDetailComponent<string> = React.memo(
  (props) => {
    return (
      <Link href={`mailto:${props.value}`} icon={<IconEmail />}>
        {props.value}
      </Link>
    );
  }
);
EmailFieldDetail.displayName = 'EmailFieldDetail';

export const createEmailField = createFieldFactory({
  detail: EmailFieldDetail,
  edit: TextFieldEdit,
});
