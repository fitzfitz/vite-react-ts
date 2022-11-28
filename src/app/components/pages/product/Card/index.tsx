import { differenceInDays } from "date-fns";
import styles from "./Card.module.scss";
import { Carousel } from "flowbite-react";
import { ProductType } from "@tm-wear/app/api/types/product";

interface Props {
  product: ProductType;
  onClick?: (product: ProductType) => void;
}

function ProductCard({ product, onClick }: Props) {
  return (
    <div className={styles.card} onClick={() => onClick?.(product)}>
      <div>
        <div className={styles.container}>
          {product.product_images.length === 1 ? (
            <img src={product?.product_images[0]?.image} alt={product?.name} />
          ) : (
            <Carousel
              indicators={false}
              slide={false}
              leftControl={" "}
              rightControl={" "}
            >
              {product.product_images.map((image) => (
                <img key={image.id} src={image?.image} alt={product?.name} />
              ))}
            </Carousel>
          )}
        </div>
        {/* {product?.createdAt ? (
          <div className={styles.dateAdded}>
            {formatDistanceStrict(new Date(product.createdAt), new Date(), {
              addSuffix: true,
            })}
          </div>
        ) : null} */}
        {differenceInDays(new Date(), new Date(product.createdAt)) <= 7 ? (
          <div className={styles.ribbonContainer}>
            <div className={styles.ribbon}>New</div>
          </div>
        ) : null}
        {product.product_price ? (
          <div className={styles.price}>
            <div>Rp. {(+product.product_price.price).toLocaleString()}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductCard;
