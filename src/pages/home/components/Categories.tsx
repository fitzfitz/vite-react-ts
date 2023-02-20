import React from "react";

import all from "@tm-wear/assets/categories/all.png";
import blouse from "@tm-wear/assets/categories/blouse.png";
import cardigan from "@tm-wear/assets/categories/cardigan.png";
import crewneck from "@tm-wear/assets/categories/crewneck.png";
import flannel from "@tm-wear/assets/categories/flannel.png";
import pants from "@tm-wear/assets/categories/pants.png";
import shirt from "@tm-wear/assets/categories/shirt.png";
import tshirt from "@tm-wear/assets/categories/tshirt.png";
import useMaster from "@tm-wear/api/hooks";
import useProductListStore from "@tm-wear/app/store/zustand/productList/useProductList";

const Categories = () => {
  const { filter, setFilterProductList: setFilter } = useProductListStore();
  const { useCategories } = useMaster();
  const { data: categories } = useCategories();

  return (
    <div className="flex max-w-full gap-10 overflow-auto">
      <div
        className={`flex min-w-[40px] cursor-pointer flex-col items-center gap-2 ${
          filter.product_category_id === 0 ? "opacity-100" : "opacity-40"
        }`}
        onClick={() => setFilter({ product_category_id: 0 })}
        aria-hidden
      >
        <img alt="All" src={all} width={40} />
        <span className="text-xs">Lihat semua</span>
      </div>
      {categories?.map((category) => (
        <div
          aria-hidden
          onClick={() => setFilter({ product_category_id: category.id })}
          className={`flex min-w-[40px] cursor-pointer flex-col items-center gap-2 ${
            filter.product_category_id === category.id
              ? "opacity-100"
              : "opacity-40"
          }`}
          key={category.id}
        >
          <img
            alt={category.category}
            src={
              category.id === 1
                ? cardigan
                : category.id === 2
                ? crewneck
                : category.id === 3
                ? blouse
                : category.id === 4
                ? tshirt
                : category.id === 5
                ? shirt
                : category.id === 6
                ? flannel
                : category.id === 7
                ? pants
                : ""
            }
            width={40}
          />
          <span className="text-xs">{category.category}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
