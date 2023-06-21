import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { UserIdentity } from '../api';

interface UserStoreState {
  isLogin: boolean;
  userIdentity: UserIdentity;
  setIsLogin: (isLogin: boolean) => void;
}

export const useUserStore = create<UserStoreState>()(
  immer((set) => ({
    isLogin: false,
    userIdentity: { id: '', fullName: '' },
    setIsLogin: (isLogin: boolean) => {
      set({ isLogin });
    },
  }))
);
