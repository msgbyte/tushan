import create from 'zustand';
import { request } from '../model/utils';

interface ResourceMeta {
  resourceLabel: string;
  resourceName: string;
}

interface LayoutState {
  resources: ResourceMeta[];
  init: () => Promise<void>;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  resources: [],
  init: async () => {
    const { data } = await request.get(`/meta/all`);

    set({
      resources: data.list as ResourceMeta[],
    });
  },
}));
