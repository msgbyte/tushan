import React, { useState } from 'react';
import { BasicRecord } from '../../api';
import { ViewType } from '../../context/viewtype';
import { useEvent } from '../../hooks/useEvent';
import { FieldHandler } from '../fields';
import { ListTableDrawer } from './ListTableDrawer';

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
