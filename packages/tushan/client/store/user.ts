import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface UserStoreState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useUserStore = create<UserStoreState>()(
  immer((set) => ({
    isLogin: false,
    setIsLogin: (isLogin: boolean) => {
      set({ isLogin });
    },
  }))
);
