import create from "zustand";
import { LayoutDefaultState } from "@tm-wear/app/api/types/layout";

export interface LayoutState extends LayoutDefaultState {
  toogleGlobalLoader: () => void;
}

const defaultStore = {
  isOpenGlobalLoader: false,
} as LayoutDefaultState;

const useLayoutStore = create<LayoutState>()((set) => ({
  ...defaultStore,
  toogleGlobalLoader: () => {
    set((state) => ({
      ...defaultStore,
      isOpenGlobalLoader: !state.isOpenGlobalLoader,
    }));
  },
}));

export default useLayoutStore;
