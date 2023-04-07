import { Link } from '@arco-design/web-react';
import React from 'react';
import { useTableStore } from '../../table/store';
import { MetaViewTypeProps } from '../__shared__/types';
import { renderPlain } from '../__shared__/utils';

export const MetaBaseList: React.FC<MetaViewTypeProps> = React.memo((props) => {
  const { showDetailDrawer } = useTableStore();

  if (props.resourcePropertyMeta.isPrimary) {
    return (
      <Link hoverable={false} onClick={() => showDetailDrawer(props.record)}>
        {renderPlain(props.value)}
      </Link>
    );
  }

  return <div>{renderPlain(props.value)}</div>;
});
MetaBaseList.displayName = 'MetaBaseList';
