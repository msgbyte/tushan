import React, { useState } from 'react';
import { Drawer } from '@arco-design/web-react';
import { FieldHandler } from '../field';
import { EditForm } from '../edit/EditForm';
import { ViewType } from '../../context/viewtype';
import { useEvent } from '../../hooks/useEvent';
import { DetailForm } from '../detail/DetailForm';
import { BasicRecord } from '../../api/types';

export function useListTableDrawer(fields: FieldHandler[]) {
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('detail');
  const [record, setRecord] = useState<BasicRecord>({} as BasicRecord);
  const showTableDrawer = useEvent(
    (viewType: ViewType, record: BasicRecord) => {
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
  record: BasicRecord;
  viewType: ViewType;
  width?: number;
}
export const ListTableDrawer: React.FC<ListTableDrawerProps> = React.memo(
  (props) => {
    return (
      <Drawer
        title={props.viewType === 'edit' ? 'Edit' : 'Detail'}
        visible={props.visible}
        onCancel={() => props.onChangeVisible(false)}
        width={props.width ?? 680}
        maskClosable={props.viewType !== 'edit'}
      >
        {props.viewType === 'edit' ? (
          <EditForm fields={props.fields} record={props.record} />
        ) : (
          <DetailForm fields={props.fields} record={props.record} />
        )}
      </Drawer>
    );
  }
);
ListTableDrawer.displayName = 'ListTableDrawer';
