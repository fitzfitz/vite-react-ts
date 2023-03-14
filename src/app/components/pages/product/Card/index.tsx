import React from "react";
import { differenceInDays } from "date-fns";
import styles from "./Card.module.scss";
import { ProductType } from "@tm-wear/app/api/types/product";

interface Props {
  reseller?: string;
  product: ProductType;
  onClick?: (product: ProductType) => void;
}

function ProductCard({ reseller, product, onClick }: Props) {
  return (
    <div
      className={styles.card}
      onClick={() => onClick?.(product)}
      aria-hidden="true"
    >
      <div>
        <div className={styles.container}>
          <img
            src={`${
              product?.productImage.find((x) => x.isPrimary)?.image ||
              product?.productImage[0]?.image
            }&size=20`}
            alt={product?.name}
          />
        </div>
        {/* {product?.createdAt ? (
          <div className={styles.dateAdded}>
            {formatDistanceStrict(new Date(product.createdAt), new Date(), {
              addSuffix: true,
            })}
          </div>
        ) : null} */}
        {product.createdAt &&
        differenceInDays(new Date(), new Date(product.createdAt)) <= 7 ? (
          <div className={styles.ribbonContainer}>
            <div className={styles.ribbon}>New</div>
          </div>
        ) : null}
        {/* {product.product_price ? (
          <div className={styles.price}>
            <div>Rp. {(+product.product_price.price).toLocaleString()}</div>
          </div>
        ) : null} */}
        <div className={styles.info}>
          <div title={product?.name} className={styles.productName}>
            {product?.name}
          </div>
          {reseller && reseller !== "" && product.productItem?.price ? (
            <div className={styles.productPrice}>
              Rp. {(+product?.productItem?.price).toLocaleString()}
            </div>
          ) : reseller && reseller !== "" && !product.productItem?.price ? (
            <div className={styles.productPriceUnavailable}>Tidak tersedia</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
