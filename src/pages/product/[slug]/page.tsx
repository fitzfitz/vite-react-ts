import React from "react";
import useSwr from "swr";
import UserMain from "@tm-wear/app/layout/main/UserMain";
import useAuthStore from "@tm-wear/app/store/zustand/auth/useAuth";
import styles from "./ProductID.module.scss";
import { useParams } from "react-router-dom";
import { productDetailFetcher } from "@tm-wear/app/api/fetcher/product";
import { Carousel } from "flowbite-react";

function ProductDetailScreen({}) {
  const auth = useAuthStore();
  const { slug, user } = useParams();
  const { data: product, error } = useSwr(
    { url: `/catalog/product/${slug}`, headers: { reseller: user } },
    productDetailFetcher
  );

  return (
    <UserMain
      homeUrl={user ? `/@${user}` : "/"}
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
              <div className={styles.content}>
                <div className={styles.images}>
                  <div className={styles.imagesContent}>
                    <div className="h-full">
                      <Carousel slide={false}>
                        {product?.product_images.map((image) => (
                          <img
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
                  <label className={styles.productTitle}>{product.name}</label>
                  <div className={styles.productDetail}>
                    <div className={styles.productDetailContent}>
                      <label className={styles.productDetailText}>Varian</label>
                      <label className={styles.productDetailText}>
                        {product.variant || "-"}
                      </label>
                    </div>

                    <div className={styles.productDetailContent}>
                      <label className={styles.productDetailText}>Harga</label>

                      {product?.product_price ? (
                        <label className={styles.productDetailText}>
                          Rp.{" "}
                          {(+product?.product_price?.price!)?.toLocaleString()}
                        </label>
                      ) : (
                        <label className={styles.productDetailText}>-</label>
                      )}
                    </div>
                  </div>
                  <div className={styles.productDesc}>
                    <label className={styles.productDescText}>
                      {product.description}
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </UserMain>
  );
}

export default ProductDetailScreen;
