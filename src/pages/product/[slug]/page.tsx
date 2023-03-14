import React, { useState } from "react";
import UserMain from "@tm-wear/app/layout/main/UserMain";
import useAuthStore from "@tm-wear/app/store/zustand/auth/useAuth";
import { useParams } from "react-router-dom";
import { productDetailFetcher } from "@tm-wear/app/api/fetcher/product";
import { useQuery } from "@tanstack/react-query";
import ProductCarousel from "./components/ProductCarousel";
import ProductContent from "./components/ProductContent";
import ProductUpdate from "./components/ProductUpdate";
import ProductUpdateForm from "./components/ProductUpdateForm";
import NoDataFound from "./components/NoDataFound";
import Reseller from "./components/Reseller";

function ProductDetailScreen() {
  const auth = useAuthStore();
  const { slug, user: reseller } = useParams();
  const [drawer, setDrawer] = useState(false);

  const {
    data: product,
    error,
    refetch,
  } = useQuery(
    [`/catalog/product/${slug}`],
    () =>
      productDetailFetcher({
        url: `/catalog/product/${slug}`,
        headers: { reseller },
      }),
    {
      enabled: !!slug,
    }
  );

  return (
    <UserMain
      homeUrl={reseller ? `/${reseller}` : "/"}
      title={product?.name}
      auth={auth}
    >
      <div className="px-4 py-4 lg:py-6 lg:px-6">
        <div className="mx-auto grid max-w-screen-lg">
          {!product && error ? (
            <div className="py-10">
              <NoDataFound />
            </div>
          ) : null}
          {product ? (
            <>
              {auth.user ? (
                <ProductUpdate product={product} onOpenForm={setDrawer} />
              ) : null}

              <div className="mb-4 grid grid-cols-1 gap-10 rounded-lg border bg-white p-4 shadow-md md:grid-cols-2 lg:mb-6">
                <ProductCarousel product={product} />
                <ProductContent product={product} reseller={reseller || ""} />
              </div>
              <div className="mb-4 grid grid-cols-1 gap-10 lg:mb-6">
                <Reseller reseller={reseller || ""} />
              </div>
            </>
          ) : null}
        </div>
      </div>
      {auth.user ? (
        <ProductUpdateForm
          data={product}
          isOpen={drawer}
          onClose={() => setDrawer(false)}
          refetch={refetch}
        />
      ) : null}
    </UserMain>
  );
}

export default ProductDetailScreen;
