import { create } from "zustand";
import { ProductParamsType } from "@tm-wear/app/api/types/product";

export interface ProductListState {
  filter: ProductParamsType;
  setFilterProductList: (formData: ProductParamsType) => void;
}

const defaultStore = {
  filter: {
    keyword: "",
    limit: 10,
    page: 1,
    product_category_id: 0,
  } as ProductParamsType,
};

const useProductListStore = create<ProductListState>()((set) => ({
  ...defaultStore,
  setFilterProductList: (formData: ProductParamsType) =>
    set((state) => ({
      ...defaultStore,
      filter: { ...state.filter, ...formData },
    })),
}));

export default useProductListStore;
