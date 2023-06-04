import { useEvent } from '../hooks/useEvent';
import { sharedEvent } from '../utils/event';

export function useRefreshList(resource: string) {
  const refresh = useEvent(() => {
    sharedEvent.emit('refreshList', resource);
  });

  return refresh;
}
