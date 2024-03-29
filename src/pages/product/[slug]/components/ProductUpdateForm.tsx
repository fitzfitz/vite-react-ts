import React, { useEffect, useState } from "react";
import TMDrawer from "@tm-wear/components/TMDrawer";
import { FcInfo, FcPlus } from "react-icons/fc";
import { ProductType } from "@tm-wear/app/api/types/product";
import { useMutation } from "@tanstack/react-query";
import client from "@tm-wear/app/utils/axiosClient";
import useLayoutStore from "@tm-wear/app/store/zustand/layout/useLayout";
import { TMToast } from "@tm-wear/app/components/Toaster";
import { NumericFormat } from "react-number-format";

interface Props {
  data?: ProductType | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

function ProductUpdateForm({ data, isOpen, onClose, refetch }: Props) {
  const [enable, setEnable] = useState<boolean>(true);
  const [price, setPrice] = useState<number | string>("");
  const [shopee, setShopee] = useState<string>("");
  const [tokopedia, setTokopedia] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const toogleGlobalLoader = useLayoutStore(
    (state) => state.toogleGlobalLoader
  );

  const mutation = useMutation({
    mutationFn: () => {
      return client.post(`/catalog/reseller/item`, {
        price: +price,
        description: description,
        enable: enable,
        shopee: shopee || null,
        tokopedia: tokopedia || null,
        link: link || null,
        productId: data?.id || undefined,
        id: data?.productItem?.id || undefined,
      });
    },
    onMutate: () => {
      toogleGlobalLoader();
    },
    onSettled: (resp, error) => {
      if (resp?.data?.success) {
        TMToast.toast.success("Sukses mengubah info produk");
        refetch();
        setTimeout(() => {
          onClose();
        }, 1000);
      } else if (!resp?.data?.success || error) {
        TMToast.toast.error("Gagal mengubah info produk");
      }
      setTimeout(toogleGlobalLoader, 1000);
    },
  });

  const onSubmit = () => {
    mutation.mutate();
  };

  useEffect(() => {
    if (data && isOpen) {
      setPrice(data.productItem?.price || "");
      setDescription(data.productItem?.description || "");
      setShopee(data.productItem?.shopee || "");
      setTokopedia(data.productItem?.tokopedia || "");
      setLink(data.productItem?.link || "");
      setEnable(!!data.productItem?.enable);
    } else {
      setPrice("");
      setDescription("");
      setShopee("");
      setTokopedia("");
      setLink("");
      setEnable(false);
    }
  }, [data, isOpen]);

  return (
    <TMDrawer
      position="right"
      isOpen={isOpen}
      onClose={onClose}
      className="w-96"
      title="Atur Produk"
      closeIcon={<FcPlus className="rotate-45" />}
    >
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="priceInput"
        >
          Harga
        </label>
        <NumericFormat
          required
          placeholder="Input price"
          name="price"
          id="price"
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          allowNegative={false}
          thousandSeparator=","
          prefix={"Rp. "}
          decimalScale={0}
          isAllowed={(values) => {
            const { floatValue } = values;
            return (floatValue || 0) <= 99999999;
          }}
          value={price || ""}
          onValueChange={(values) => {
            setPrice(values.floatValue || "");
          }}
        />
        <span className="block text-right text-[0.775rem] font-bold italic text-gray-400">
          Harga dasar: {Number(data?.catalogPrice)?.toLocaleString()}
        </span>
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="shopeeInput"
        >
          Shopee
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="shopeeInput"
          type="text"
          placeholder="Input url shopee..."
          value={shopee}
          onChange={(e) => setShopee(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="tokpedInput"
        >
          Tokopedia
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="tokpedInput"
          type="text"
          placeholder="Input url tokopedia..."
          value={tokopedia}
          onChange={(e) => setTokopedia(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="linkInput"
        >
          Olshop lain
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="linkInput"
          type="text"
          placeholder="Input url olshop lainnya..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="mb-2 flex items-center justify-between text-sm font-bold text-gray-700"
          htmlFor="descriptionInput"
        >
          Deskripsi
          <div
            aria-hidden
            onClick={() => setDescription(data?.description || "")}
            className="ml-2 flex cursor-pointer items-center font-normal"
          >
            <div className="relative rounded border bg-white px-1.5 text-[0.675rem]">
              <div className="absolute -right-2 top-[4px] inline-block h-full overflow-hidden">
                <div className="h-2 w-2 origin-top-left rotate-45 transform border bg-white"></div>
              </div>
              Gunakan deskripsi bawaan
            </div>
            <FcInfo className="ml-2" />
          </div>
        </label>
        <textarea
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="descriptionInput"
          placeholder="Input description..."
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block font-bold">
          <input
            className="mr-2 leading-tight"
            type="checkbox"
            checked={enable}
            onChange={(e) => setEnable(e.target.checked)}
          />
          <span className="text-sm">Tampilkan ke customer</span>
        </label>
      </div>

      <div className="mb-4 flex justify-end">
        <button
          disabled={price === "" || description === ""}
          onClick={onSubmit}
          className="rounded border border-blue-700 bg-blue-500 py-1 px-2 text-sm font-bold text-white transition-all hover:bg-blue-700 disabled:border-blue-200 disabled:bg-blue-200"
        >
          Simpan
        </button>
      </div>
    </TMDrawer>
  );
}

export default ProductUpdateForm;
