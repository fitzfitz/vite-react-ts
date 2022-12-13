import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcSettings, FcSearch, FcPlus } from "react-icons/fc";
import { ProductType } from "@tm-wear/app/api/types/product";
import ProductCard from "../Card";
import styles from "./ProductList.module.scss";
import { useNavigate } from "react-router-dom";
import { useFetchProductList } from "@tm-wear/app/api/hooks/useFetchProduct";
import useProductListStore from "@tm-wear/app/store/zustand/productList/useProductList";
import useDebounce from "@tm-wear/app/utils/useDebounce";
import TMDrawer from "@tm-wear/components/TMDrawer";
import { productCategoryFetcher } from "@tm-wear/app/api/fetcher/product";
import { useQuery } from "@tanstack/react-query";
import CategoriesCard from "../CategoriesCard";
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
  return (
    <>
      {isInitialLoading ? (
        <div className={styles.imageContainer}>
          {[...Array(10).keys()].map((x, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className={styles.imageContainer}>
          {dataSet?.map((product: ProductType) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate("product/" + product.slug)}
            />
          ))}
        </div>
      )}
      {(dataSet?.length === 0 && !isLoad) || error ? (
        <div className="text-center text-2xl font-bold text-red-500">
          Ooops, tidak ada produk ditemukan
        </div>
      ) : null}
      {!isLast && dataSet?.length > 0 ? (
        <div className="flex justify-center p-5">
          <button
            disabled={isLoad}
            className={styles.loadMore}
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
  const { keyword } = useProductListStore((state) => state.filter);
  const filter = useProductListStore((state) => state.filter);
  const setFilter = useProductListStore((state) => state.setFilterProductList);
  const [drawer, setDrawer] = useState<boolean>(false);

  const debouncedFilter = useDebounce<string>(filter.keyword || "", 500);

  const { data: categories } = useQuery(["product-category"], () =>
    productCategoryFetcher({
      url: `/catalog/product-category/`,
    })
  );

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
  return (
    <div className={styles.root}>
      <div className={styles.filterContainer}>
        <div className="flex">
          <div className="relative mr-4 flex h-8">
            <input
              value={keyword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFilter({ keyword: event.target.value })
              }
              placeholder="Cari produk..."
              className="form-input text-xs+ peer h-full w-60 rounded-full border-none bg-slate-100 px-4 pl-10 text-slate-800 transition-all duration-200 hover:bg-slate-200 focus:w-80 focus:bg-slate-200 focus:ring focus:ring-blue-500"
              type="text"
            />
            <div className="peer-focus:text-blue dark:text-navy-300 dark:peer-focus:text-accent pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400">
              <FcSearch size={"19px"} />
            </div>
          </div>
        </div>
        <button onClick={() => setDrawer(true)} className="hover:animate-spin">
          <FcSettings size={22} />
        </button>
      </div>

      <ProductListContent
        error={error}
        dataSet={data?.pages.map((each) => each?.data)?.flat() as ProductType[]}
        loadMore={fetchNextPage}
        isLast={!hasNextPage}
        isLoad={isFetchingNextPage}
        isInitialLoading={isInitialLoading}
      />

      <TMDrawer
        position="right"
        isOpen={drawer}
        onClose={() => setDrawer(false)}
        className="w-72"
        title="Sesuaikan Produk"
        closeIcon={<FcPlus className="rotate-45" />}
      >
        <label className="block pb-2 text-sm" htmlFor="category">
          Pilih berdasarkan kategori
        </label>
        <div id="category" className={styles.categoryList}>
          {categories?.map((category) => (
            <CategoriesCard
              isChecked={category.id === filter.product_category_id}
              key={category.id}
              data={category}
              onClick={(e) => {
                setFilter({ product_category_id: e.id });
                setDrawer(false);
              }}
            />
          ))}
        </div>
      </TMDrawer>
    </div>
  );
}

export default ProductList;
