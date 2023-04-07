import { Button, Message, Popconfirm } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import React from 'react';
import type { BasicRecord } from '../../../api';
import { useDelete } from '../../../api/useDelete';
import { useResourceContext } from '../../../context/resource';

export const ListDeleteAction: React.FC<{
  record: BasicRecord;
}> = React.memo((props) => {
  const resource = useResourceContext();
  const [deleteOne] = useDelete();

  return (
    <Popconfirm
      focusLock
      position="tr"
      title="Confirm"
      content="Are you sure you want to delete?"
      onOk={async () => {
        await deleteOne(resource, {
          id: props.record.id,
        });

        Message.info({
          content: 'Delete Success',
        });
      }}
    >
      <Button icon={<IconDelete />} />
    </Popconfirm>
  );
});
ListDeleteAction.displayName = 'ListDeleteAction';
