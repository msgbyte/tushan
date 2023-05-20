import React, { useState } from 'react';
import { Drawer } from '@arco-design/web-react';
import type { FieldHandler } from '../fields';
import { EditForm } from '../edit/EditForm';
import type { ViewType } from '../../context/viewtype';
import { useEvent } from '../../hooks/useEvent';
import { DetailForm } from '../detail/DetailForm';
import type { BasicRecord } from '../../api/types';
import { useTranslation } from 'react-i18next';

export interface ListTableDrawerProps {
  visible: boolean;
  onChangeVisible: (visible: boolean) => void;
  fields: FieldHandler[];
  record: BasicRecord | null;
  viewType: ViewType;
  width?: number;
}
export const ListTableDrawer: React.FC<ListTableDrawerProps> = React.memo(
  (props) => {
    const { t } = useTranslation();
    const hide = useEvent(() => {
      props.onChangeVisible(false);
    });

    return (
      <Drawer
        title={
          props.viewType === 'edit'
            ? props.record === null
              ? t('tushan.list.create')
              : t('tushan.list.edit')
            : t('tushan.list.detail')
        }
        visible={props.visible}
        onCancel={hide}
        width={props.width ?? 680}
        maskClosable={props.viewType !== 'edit'}
        footer={null}
      >
        {props.viewType === 'edit' ? (
          <EditForm
            fields={props.fields}
            record={props.record}
            onSuccess={hide}
            onCancel={hide}
          />
        ) : (
          <DetailForm
            fields={props.fields}
            record={props.record ?? ({} as any)}
          />
        )}
      </Drawer>
    );
  }
);
ListTableDrawer.displayName = 'ListTableDrawer';
