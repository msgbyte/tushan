import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { findTreeNode } from '../utils/tree';

export interface TushanMenu {
  key: string;
  label?: string;
  icon?: React.ReactNode;
  path?: string;
  children?: TushanMenu[];
}

export interface TushanCategoryPathInfo {
  name: string;
  label?: string;
  icon?: string;
}

interface MenuStoreState {
  menus: TushanMenu[];
  addMenu: (menu: TushanMenu, path: TushanCategoryPathInfo[]) => void;
  removeMenu: (menuKey: string) => void;
  findMenuByKey: (menuKey: string) => TushanMenu | null;
  findMenuBySelector: (
    menuSelector: (menu: TushanMenu) => boolean
  ) => TushanMenu | null;
}

/**
 * Record sidebar menu list
 */
export const useMenuStore = create<MenuStoreState>()(
  immer((set, get) => ({
    menus: [],
    addMenu: (menu: TushanMenu, path: TushanCategoryPathInfo[]) => {
      set((state) => {
        let currLevel = state.menus;
        for (const p of path) {
          const target = getMenuWithKey(currLevel, p.name);
          if (target) {
            if (!target.children) {
              target.children = [];
            }
            currLevel = target.children;
          } else {
            const target: TushanMenu = {
              key: p.name,
              label: p.label,
              icon: p.icon,
              children: [],
            };
            currLevel.push(target);
            currLevel = target.children!;
          }
        }

        if (getMenuWithKey(currLevel, menu.key)) {
          console.warn('This menu has been exist:', menu);

          return;
        }

        currLevel.push(menu);
      });
    },
    removeMenu: (menuKey: string) => {
      set((state) => {
        state.menus = state.menus.filter((menu) => menu.key !== menuKey);
      });
    },
    findMenuByKey: (menuKey: string) => {
      return findTreeNode(get().menus, (menu) => menu.key === menuKey);
    },
    findMenuBySelector: (menuSelector: (menu: TushanMenu) => boolean) => {
      return findTreeNode(get().menus, menuSelector);
    },
  }))
);

function getMenuWithKey(menus: TushanMenu[], key: string) {
  return menus.find((m) => m.key === key);
}
