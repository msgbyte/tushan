import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface TushanMenu {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
}

interface MenuStoreState {
  menus: TushanMenu[];
}

/**
 * Record sidebar menu list
 */
export const useMenuStore = create<MenuStoreState>()(
  immer((set) => ({
    menus: [],
    addMenu: (menu: TushanMenu) => {
      set((state) => {
        state.menus.push(menu);
      });
    },
  }))
);
