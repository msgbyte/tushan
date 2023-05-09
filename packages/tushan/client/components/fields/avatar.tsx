import { Avatar } from '@arco-design/web-react';
import React from 'react';
import { isValidUrl } from '../../utils/common';
import { createFieldFactory } from './factory';
import { TextFieldEdit } from './text';
import type { FieldDetailComponent } from './types';

export const AvatarFieldDetail: FieldDetailComponent<string> = React.memo(
  (props) => {
    return (
      <Avatar>
        {isValidUrl(props.value) ? (
          <img alt="avatar" src={props.value} />
        ) : (
          <span>{props.value}</span>
        )}
      </Avatar>
    );
  }
);
AvatarFieldDetail.displayName = 'AvatarFieldDetail';

export const createAvatarField = createFieldFactory({
  detail: AvatarFieldDetail,
  edit: TextFieldEdit,
});
