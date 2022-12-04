import create from "zustand";
import {
  LayoutDefaultState,
  LayoutFilterForm,
} from "@tm-wear/app/api/types/layout";

export interface LayoutState extends LayoutDefaultState {
  setForm: (formData: LayoutFilterForm) => void;
  setFilterDrawer: () => void;
}

const defaultStore = {
  filterDrawer: false,
  filterForm: {
    keyword: "",
    categoryId: 0,
  },
} as LayoutDefaultState;

const useLayoutStore = create<LayoutState>()((set) => ({
  ...defaultStore,
  setForm: (formData: LayoutFilterForm) =>
    set((state) => ({
      ...defaultStore,
      filterForm: { ...state.filterForm, ...formData },
    })),
  setFilterDrawer: () => {
    set((state) => ({ ...defaultStore, filterDrawer: !state.filterDrawer }));
  },
}));

export default useLayoutStore;
