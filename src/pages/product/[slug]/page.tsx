import React, { useState } from "react";
import UserMain from "@tm-wear/app/layout/main/UserMain";
import useAuthStore from "@tm-wear/app/store/zustand/auth/useAuth";
import styles from "./ProductID.module.scss";
import { Link, useParams } from "react-router-dom";
import { productDetailFetcher } from "@tm-wear/app/api/fetcher/product";
import { Carousel } from "flowbite-react";
import { FiEdit, FiPlusSquare } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import ProductUpdateForm from "@tm-wear/app/components/pages/product/ProductUpdateForm";

function ProductDetailScreen() {
  const auth = useAuthStore();
  const { slug, user: reseller } = useParams();
  const [drawer, setDrawer] = useState(false);

  const {
    data: product,
    error,
    refetch,
  } = useQuery([slug || "product-detail"], () =>
    productDetailFetcher({
      url: `/catalog/product/${slug}`,
      headers: { reseller },
    })
  );

  return (
    <UserMain
      homeUrl={reseller ? `/@${reseller}` : "/"}
      title={product?.name}
      auth={auth}
    >
      <div className={styles.root}>
        <div className={styles.container}>
          {error ? (
            <>
              <div className={styles.notFound}>
                Ooops, produk tidak ditemukan
              </div>
            </>
          ) : product ? (
            <>
              {auth.user ? (
                <div className=" mb-4 flex items-center justify-between rounded-lg bg-green-100 p-3 text-sm text-black/60">
                  {product?.product_price?.price ? (
                    <span>Atur ulang produk ini?</span>
                  ) : (
                    <span>Anda belum mengatur produk ini. Atur sekarang?</span>
                  )}
                  <div>
                    {product?.product_price?.price ? (
                      <button onClick={() => setDrawer(true)}>
                        <FiEdit size={17} />
                      </button>
                    ) : (
                      <button onClick={() => setDrawer(true)}>
                        <FiPlusSquare size={17} />
                      </button>
                    )}
                  </div>
                </div>
              ) : null}

              <div className={styles.content}>
                <div className={styles.images}>
                  <div className={styles.imagesContent}>
                    <div className="h-full">
                      <Carousel slide={false}>
                        {product?.product_images.map((image) => (
                          <img
                            loading="lazy"
                            key={image?.id}
                            src={image?.image}
                            alt={product?.name}
                          />
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </div>
                <div className={styles.detail}>
                  <label className={styles.productTitle}>
                    <span className={styles.productName}>{product.name}</span>
                    {!auth?.user && product?.product_price ? (
                      <span className={styles.productOwner}>
                        {" "}
                        By <Link to={`/@${reseller}`}>{reseller}</Link>
                      </span>
                    ) : null}
                  </label>
                  <div className={styles.productDetail}>
                    <div className={styles.productDetailContent}>
                      <label
                        htmlFor="variant"
                        className={styles.productDetailText}
                      >
                        Varian
                      </label>
                      <label id="variant" className={styles.productDetailText}>
                        {product.variant || "-"}
                      </label>
                    </div>

                    <div className={styles.productDetailContent}>
                      <label
                        htmlFor="variant"
                        className={styles.productDetailText}
                      >
                        Harga
                      </label>

                      {product?.product_price ? (
                        <label
                          id="productPrice"
                          className={styles.productDetailText}
                        >
                          Rp.{" "}
                          {(+product?.product_price?.price)?.toLocaleString()}
                        </label>
                      ) : (
                        <label
                          htmlFor="productPrice"
                          className={styles.productDetailText}
                        >
                          -
                        </label>
                      )}
                    </div>
                  </div>
                  <div className={styles.productDesc}>
                    <label className={styles.productDescText}>
                      {product?.product_price?.description ||
                        "Deskripsi tidak tersedia"}
                    </label>
                  </div>
                </div>
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
