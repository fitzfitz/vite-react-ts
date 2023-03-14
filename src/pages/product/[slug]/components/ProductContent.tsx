import React from "react";
import { ProductType } from "@tm-wear/app/api/types/product";
import { BiShoppingBag } from "react-icons/bi";
import shopee from "@tm-wear/assets/shopee.svg";
import tokopedia from "@tm-wear/assets/tokopedia.svg";

interface Props {
  product: ProductType;
  reseller: string;
}

const ProductContent: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col gap-8 md:py-6">
      <label className="flex flex-col gap-2 text-3xl font-thin">
        <span>{product.name}</span>
      </label>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 leading-6 text-gray-500">
          <label htmlFor="variant" className="">
            Varian
          </label>
          <label id="variant" className="">
            {product.variant || "-"}
          </label>
        </div>

        <div className="grid grid-cols-2 leading-6 text-gray-500">
          <label htmlFor="variant" className="">
            Harga
          </label>

          {product.productItem?.price ? (
            <label id="productPrice" className="">
              Rp. {(+product?.productItem?.price)?.toLocaleString()}
            </label>
          ) : (
            <label htmlFor="productPrice" className="">
              -
            </label>
          )}
        </div>
      </div>
      <label className="whitespace-pre-line rounded-lg border p-4 shadow-md">
        {product?.productItem?.description || "Deskripsi tidak tersedia"}
      </label>
      <div className="flex flex-col">
        <button className="relative flex items-center justify-center gap-2 rounded-t-md bg-orange-400 p-2 text-white shadow-sm">
          <BiShoppingBag />
          Dapatkan di toko favorit anda
        </button>
        <div className="relative flex flex-col overflow-hidden rounded-b-md border">
          <a
            href={product.productItem?.shopee}
            rel="noreferrer"
            target="_blank"
            className={`flex items-center gap-2 border-b p-4 ${
              product.productItem?.shopee ? "opacity-100" : "opacity-30"
            }`}
          >
            <img src={shopee} alt="shopee" width="20" />
            Shopee
          </a>
          <a
            href={product.productItem?.tokopedia}
            rel="noreferrer"
            target="_blank"
            className={`flex items-center gap-2 p-4 ${
              product.productItem?.tokopedia ? "opacity-100" : "opacity-30"
            }`}
          >
            <img src={tokopedia} alt="tokopedia" width="20" />
            Tokopedia
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
