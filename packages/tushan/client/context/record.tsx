import React, { useContext } from 'react';
import type { BasicRecord } from '../api/types';

const RecordContext = React.createContext<BasicRecord>({} as BasicRecord);
RecordContext.displayName = 'RecordContext';

export const RecordContextProvider: React.FC<
  React.PropsWithChildren<{ record: BasicRecord }>
> = React.memo((props) => {
  return (
    <RecordContext.Provider value={props.record}>
      {props.children}
    </RecordContext.Provider>
  );
});
RecordContextProvider.displayName = 'RecordContextProvider';

/**
 * 获取上下文中的记录
 */
export function useRecordContext(): BasicRecord {
  return useContext(RecordContext);
}
