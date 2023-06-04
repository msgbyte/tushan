import { IconRefresh } from '@arco-design/web-react/icon';
import React from 'react';
import { SubmitButton } from '../../SubmitButton';
import { useListTableContext } from '../context';

export const ListRefreshAction: React.FC = React.memo((props) => {
  const { refetch } = useListTableContext();

  return (
    <SubmitButton
      onClick={async () => {
        await refetch();
      }}
    >
      <IconRefresh />
    </SubmitButton>
  );
});
ListRefreshAction.displayName = 'ListRefreshAction';
