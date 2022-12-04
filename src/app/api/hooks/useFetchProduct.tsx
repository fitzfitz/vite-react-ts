import { useInfiniteQuery } from "@tanstack/react-query";
import { productListFetcher } from "@tm-wear/app/api/fetcher/product";
import { ProductParamsType } from "@tm-wear/app/api/types/product";

const fetcher = (
  params: ProductParamsType,
  pageParam: number,
  headers: { [key: string]: string }
) => {
  const url = `/catalog/product?limit=${
    params.limit
  }&page=${pageParam}&keyword=${params.keyword}&product_category_id=${
    params.product_category_id || ""
  }`;
  return productListFetcher({
    url,
    headers,
  });
};

export function useFetchProductList(
  params: ProductParamsType,
  headers: { [key: string]: string }
) {
  return useInfiniteQuery(
    [name, params],
    ({ queryKey, pageParam = 1 }) =>
      fetcher(queryKey[1] as ProductParamsType, pageParam, headers),
    {
      getNextPageParam: (lastPage, allPages) => {
        const total = lastPage?.total || 0;
        const allCurrentData = allPages.map((page) => page?.data)?.flat();
        const nextPage =
          allCurrentData?.length < total ? allPages.length + 1 : undefined;

        return nextPage;
      },
    }
  );
}
