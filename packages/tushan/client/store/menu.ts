import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface TushanMenu {
  key: string;
  label?: string;
  icon?: React.ReactNode;
  path?: string;
}

interface MenuStoreState {
  menus: TushanMenu[];
  addMenu: (menu: TushanMenu) => void;
  removeMenu: (menuKey: string) => void;
}

/**
 * Record sidebar menu list
 */
export const useMenuStore = create<MenuStoreState>()(
  immer((set) => ({
    menus: [],
    addMenu: (menu: TushanMenu) => {
      set((state) => {
        if (state.menus.findIndex((m) => m.key === menu.key) >= 0) {
          console.warn('This menu has been exist:', menu);

          return;
        }

        state.menus.push(menu);
      });
    },
    removeMenu: (menuKey: string) => {
      set((state) => {
        state.menus = state.menus.filter((menu) => menu.key !== menuKey);
      });
    },
  }))
);
