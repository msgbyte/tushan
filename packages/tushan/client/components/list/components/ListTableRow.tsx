import React from 'react';
import { RecordContextProvider } from '../../../context/record';

export const ListTableRow: React.FC = React.forwardRef<
  HTMLTableRowElement,
  React.PropsWithChildren<any>
>((props, ref) => {
  const record = props.record ?? {};

  return (
    <RecordContextProvider record={record}>
      <tr {...props} ref={ref}>
        {props.children}
      </tr>
    </RecordContextProvider>
  );
});
ListTableRow.displayName = 'ListTableRow';
