import create from 'zustand';
import { fetchAllMeta, ResourceMeta } from '../model/resource/meta';

interface LayoutState {
  resources: ResourceMeta[];
  init: () => Promise<void>;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  resources: [],
  init: async () => {
    const resources = await fetchAllMeta();

    set({
      resources,
    });
  },
}));
