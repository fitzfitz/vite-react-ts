import React from "react";
import useAuthStore from "@tm-wear/app/store/zustand/auth/useAuth";
import { ProductType } from "@tm-wear/app/api/types/product";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import shopee from "@tm-wear/assets/shopee.svg";
import tokopedia from "@tm-wear/assets/tokopedia.svg";

interface Props {
  product: ProductType;
  reseller: string;
}

const ProductContent: React.FC<Props> = ({ product, reseller }) => {
  const auth = useAuthStore();
  return (
    <div className="flex flex-col md:py-6">
      <label className="mb-10 flex flex-col text-3xl font-thin">
        <span className="mb-2">{product.name}</span>
        {!auth?.user && product?.product_price ? (
          <span className="text-[16px] text-gray-400">
            {" "}
            By{" "}
            <Link className="text-blue-600 underline" to={`/@${reseller}`}>
              {reseller}
            </Link>
          </span>
        ) : null}
      </label>
      <div className="mb-10">
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

          {product?.product_price ? (
            <label id="productPrice" className="">
              Rp. {(+product?.product_price?.price)?.toLocaleString()}
            </label>
          ) : (
            <label htmlFor="productPrice" className="">
              -
            </label>
          )}
        </div>
      </div>
      <label className="mb-10">
        {product?.product_price?.description || "Deskripsi tidak tersedia"}
      </label>
      <button className="relative flex items-center justify-center gap-2 rounded-t-md bg-orange-400 p-2 text-white shadow-sm">
        <BiShoppingBag />
        Dapatkan di toko favorit anda
      </button>
      <div className="relative flex flex-col overflow-hidden rounded-b-md border">
        <button className="flex items-center gap-2 border-b p-4">
          <img src={shopee} alt="shopee" width="20" />
          Shopee
        </button>
        <button className="flex items-center gap-2 p-4">
          <img src={tokopedia} alt="tokopedia" width="20" />
          Tokopedia
        </button>
      </div>
    </div>
  );
};

export default ProductContent;
