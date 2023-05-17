import { Button, Message, Popconfirm, Tooltip } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { BasicRecord } from '../../../api';
import { useDelete } from '../../../api/useDelete';
import { useResourceContext } from '../../../context/resource';

export const ListDeleteAction: React.FC<{
  record: BasicRecord;
}> = React.memo((props) => {
  const resource = useResourceContext();
  const [deleteOne] = useDelete();
  const { t } = useTranslation();

  return (
    <Popconfirm
      focusLock
      position="tr"
      title={t('tushan.list.deleteTitle')}
      content={t('tushan.list.deleteDesc')}
      onOk={async () => {
        await deleteOne(resource, {
          id: props.record.id,
        });

        Message.info({
          content: t('tushan.list.deleteSuccess'),
        });
      }}
    >
      <Tooltip content={t('tushan.list.delete')}>
        <Button icon={<IconDelete />} />
      </Tooltip>
    </Popconfirm>
  );
});
ListDeleteAction.displayName = 'ListDeleteAction';
