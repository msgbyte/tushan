import React, { useState } from 'react';
import { Drawer } from '@arco-design/web-react';
import { FieldHandler } from '../field';
import { EditForm } from '../edit/EditForm';
import { ViewType } from '../../context/viewtype';
import { useEvent } from '../../hooks/useEvent';

export function useListTableDrawer(fields: FieldHandler[]) {
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('detail');
  const showTableDrawer = useEvent((viewType: ViewType) => {
    setViewType(viewType);
    setVisible(true);
  });

  return {
    showTableDrawer,
    drawerEl: (
      <ListTableDrawer
        visible={visible}
        onChangeVisible={setVisible}
        viewType={viewType}
        fields={fields}
      />
    ),
  };
}

export interface ListTableDrawerProps {
  visible: boolean;
  onChangeVisible: (visible: boolean) => void;
  fields: FieldHandler[];
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
        width={props.width ?? 420}
      >
        {props.viewType === 'edit' ? <EditForm fields={props.fields} /> : null}
      </Drawer>
    );
  }
);
ListTableDrawer.displayName = 'ListTableDrawer';
