import React, { useState } from 'react';
import { Drawer } from '@arco-design/web-react';
import type { FieldHandler } from '../field';
import { EditForm } from '../edit/EditForm';
import type { ViewType } from '../../context/viewtype';
import { useEvent } from '../../hooks/useEvent';
import { DetailForm } from '../detail/DetailForm';
import type { BasicRecord } from '../../api/types';
import { useResourceContext } from '../../context/resource';

export function useListTableDrawer(fields: FieldHandler[]) {
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('detail');
  const [record, setRecord] = useState<BasicRecord | null>(null);
  const showTableDrawer = useEvent(
    (viewType: ViewType, record: BasicRecord | null) => {
      setViewType(viewType);
      setRecord(record);
      setVisible(true);
    }
  );

  return {
    showTableDrawer,
    drawerEl: (
      <ListTableDrawer
        visible={visible}
        onChangeVisible={setVisible}
        viewType={viewType}
        fields={fields}
        record={record}
      />
    ),
  };
}

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
    const hide = useEvent(() => {
      props.onChangeVisible(false);
    });

    return (
      <Drawer
        title={
          props.viewType === 'edit'
            ? props.record === null
              ? 'Create'
              : 'Edit'
            : 'Detail'
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
