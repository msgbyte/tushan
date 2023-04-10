import { Link } from '@arco-design/web-react';
import React from 'react';
import { createFieldFactory } from './factory';
import { TextFieldEdit } from './text';
import type { FieldDetailComponent } from './types';

export const LinkFieldDetail: FieldDetailComponent<string> = React.memo(
  (props) => {
    return (
      <Link href={props.value} icon={true} target="_blank">
        {props.value}
      </Link>
    );
  }
);
LinkFieldDetail.displayName = 'LinkFieldDetail';

export const createUrlField = createFieldFactory({
  detail: LinkFieldDetail,
  edit: TextFieldEdit,
});
