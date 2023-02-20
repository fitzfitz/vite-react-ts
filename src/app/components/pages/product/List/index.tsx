import React, { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ProductType } from "@tm-wear/app/api/types/product";
import ProductCard from "../Card";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchProductList } from "@tm-wear/app/api/hooks/useFetchProduct";
import useProductListStore from "@tm-wear/app/store/zustand/productList/useProductList";
import useDebounce from "@tm-wear/app/utils/useDebounce";
import SkeletonCard from "../Card/Skeleton";

interface Props {
  dataSet: ProductType[];
  isLast?: boolean;
  isLoad?: boolean;
  error?: unknown;
  isInitialLoading?: boolean;
  loadMore?: () => void;
}

function ProductListContent({
  dataSet,
  isLast,
  isLoad,
  error,
  isInitialLoading,
  loadMore,
}: Props) {
  const navigate = useNavigate();
  const { user: reseller } = useParams();
  return (
    <>
      {isInitialLoading ? (
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {[...Array(10).keys()].map((x, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {dataSet?.map((product: ProductType) => (
            <ProductCard
              reseller={reseller}
              key={product.id}
              product={product}
              onClick={() => navigate("product/" + product.slug)}
            />
          ))}
        </div>
      )}
      {(dataSet?.length === 0 && !isLoad) || error ? (
        <div className="text-center text-2xl font-bold text-red-500">
          Ooops, produk tidak ditemukan
        </div>
      ) : null}
      {!isLast && dataSet?.length > 0 ? (
        <div className="flex justify-center p-5">
          <button
            disabled={isLoad}
            className="rounded-md border-2 border-orange-400 px-6 py-2 text-sm text-orange-400 transition hover:bg-orange-400 hover:text-white"
            onClick={loadMore}
          >
            {isLoad ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "More"
            )}
          </button>
        </div>
      ) : null}
    </>
  );
}

function ProductList({ user }: { user: string }) {
  const { filter, setFilterProductList: setFilter } = useProductListStore();

  const debouncedFilter = useDebounce<string>(filter.keyword || "", 500);

  const {
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useFetchProductList(
    { ...filter, keyword: debouncedFilter },
    { reseller: user }
  );
  useEffect(() => {
    return () => {
      setFilter({ product_category_id: 0 });
    };
  }, []);

  return (
    <div className="px-4 py-4 lg:py-6 lg:px-6">
      <ProductListContent
        error={error}
        dataSet={data?.pages.map((each) => each?.data)?.flat() as ProductType[]}
        loadMore={fetchNextPage}
        isLast={!hasNextPage}
        isLoad={isFetchingNextPage}
        isInitialLoading={isInitialLoading}
      />
    </div>
  );
}

export default ProductList;
