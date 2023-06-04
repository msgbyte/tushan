import { EventEmitter } from 'eventemitter-strict';

export interface TushanEventMap {
  refreshList: (resource: string) => void;
}

export const sharedEvent = new EventEmitter<TushanEventMap>();
