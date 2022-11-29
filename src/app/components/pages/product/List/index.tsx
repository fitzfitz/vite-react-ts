import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ProductType } from "@tm-wear/app/api/types/product";
import ProductCard from "../Card";
import styles from "./ProductList.module.scss";
import { useNavigate } from "react-router-dom";

// type Dataset = {
//   data: ProductType[];
//   total: number;
// };

interface Props {
  dataSet: ProductType[];
  isLast?: boolean;
  isLoad?: boolean;
  error?: unknown;
  loadMore?: () => void;
}

function ProductList({ dataSet, isLast, isLoad, error, loadMore }: Props) {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        {dataSet?.map((product: ProductType) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate("product/" + product.slug)}
          />
        ))}
      </div>
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
    </div>
  );
}

export default ProductList;
