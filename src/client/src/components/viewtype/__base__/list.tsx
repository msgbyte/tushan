import { Link } from '@arco-design/web-react';
import React from 'react';
import { useTableStore } from '../../table/store';
import { MetaViewTypeProps } from '../__shared__/types';

export const MetaBaseList: React.FC<MetaViewTypeProps> = React.memo((props) => {
  const { showDetailDrawer } = useTableStore();

  if (props.resourcePropertyMeta.isPrimary) {
    return (
      <Link hoverable={false} onClick={() => showDetailDrawer(props.record)}>
        {props.value}
      </Link>
    );
  }

  return <div>{props.value}</div>;
});
MetaBaseList.displayName = 'MetaBaseList';
