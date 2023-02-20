import { useQuery } from "@tanstack/react-query";
import { productCategoryFetcher } from "@tm-wear/app/api/fetcher/product";

const useMaster = () => {
  const useCategories = () =>
    useQuery(["product-category"], productCategoryFetcher, {
      cacheTime: Infinity,
      staleTime: Infinity,
    });
  return { useCategories };
};

export default useMaster;
