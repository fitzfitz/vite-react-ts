import React from "react";
import { ProductCategoryType } from "@tm-wear/app/api/types/product";
import { FcOk } from "react-icons/fc";
import styles from "./CategoriesCard.module.scss";

interface Props {
  data: ProductCategoryType;
  isChecked?: boolean;
  onClick?: (e: ProductCategoryType) => void;
}

function CategoriesCard({ data, isChecked, onClick }: Props) {
  return (
    <div className={styles.card} onClick={() => onClick?.(data)} aria-hidden>
      <div className={styles.cardContainer}>
        {data.category}
        {isChecked ? <FcOk className={styles.isActive} /> : null}
      </div>
    </div>
  );
}

export default CategoriesCard;
