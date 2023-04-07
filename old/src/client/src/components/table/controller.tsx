import { Button } from '@arco-design/web-react';
import React from 'react';
import _noop from 'lodash/noop';
import { useTableStore } from './store';

export const TushanTableController: React.FC = React.memo(() => {
  const { showAddDrawer } = useTableStore();

  return (
    <div className="text-right py-2">
      <Button type="primary" onClick={showAddDrawer}>
        Add
      </Button>
    </div>
  );
});
TushanTableController.displayName = 'TushanTableController';
