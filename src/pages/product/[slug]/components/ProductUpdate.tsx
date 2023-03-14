import React from "react";
import { ProductType } from "@tm-wear/app/api/types/product";
import { FiEdit, FiPlusSquare } from "react-icons/fi";

interface Props {
  product: ProductType;
  onOpenForm: (open: boolean) => void;
}

const ProductUpdate: React.FC<Props> = ({ product, onOpenForm }) => {
  return (
    <div className=" mb-4 flex items-center justify-between rounded-sm bg-green-100 p-3 text-sm text-black/60 shadow-sm">
      {product.productItem ? (
        <span>Atur ulang produk ini?</span>
      ) : (
        <span>Anda belum mengatur produk ini. Atur sekarang?</span>
      )}
      <div>
        {product.productItem ? (
          <button onClick={() => onOpenForm(true)}>
            <FiEdit size={17} />
          </button>
        ) : (
          <button onClick={() => onOpenForm(true)}>
            <FiPlusSquare size={17} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductUpdate;
