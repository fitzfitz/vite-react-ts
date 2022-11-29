import React from "react";
import UserMain from "@tm-wear/app/layout/main/UserMain";
import useAuthStore from "@tm-wear/app/store/zustand/auth/useAuth";
import ProductList from "@tm-wear/app/components/pages/product/List";
import { useProductPagination } from "@tm-wear/app/api/hooks/useProduct";
import { ProductType } from "@tm-wear/app/api/types/product";
import { productListFetcher } from "@tm-wear/app/api/fetcher/product";
import { useParams } from "react-router-dom";

function HomeScreen() {
  const auth = useAuthStore();
  const { user } = useParams();
  const { dataSet, setSize, size, isReachingEnd, isLoadingMore, error } =
    useProductPagination<ProductType>({
      url: "/catalog/product",
      limit: 10,
      fetcher: productListFetcher,
      extraHeaders: {
        reseller: user,
      },
    });

  return (
    <UserMain homeUrl={user ? `/@${user}` : "/"} auth={auth}>
      <ProductList
        error={error}
        dataSet={dataSet}
        loadMore={() => setSize(size + 1)}
        isLast={isReachingEnd}
        isLoad={isLoadingMore}
      />
    </UserMain>
  );
}

export default HomeScreen;
