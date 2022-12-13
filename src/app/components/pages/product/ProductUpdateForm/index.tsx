import React, { useEffect, useState } from "react";
import TMDrawer from "@tm-wear/components/TMDrawer";
import { FcInfo, FcPlus } from "react-icons/fc";
import { ProductType } from "@tm-wear/app/api/types/product";
import { useMutation } from "@tanstack/react-query";
import client from "@tm-wear/app/utils/axiosClient";
import useLayoutStore from "@tm-wear/app/store/zustand/layout/useLayout";
import { TMToast } from "@tm-wear/app/components/Toaster";

interface Props {
  data?: ProductType | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

function ProductUpdateForm({ data, isOpen, onClose, refetch }: Props) {
  const [enable, setEnable] = useState<boolean>(true);
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const toogleGlobalLoader = useLayoutStore(
    (state) => state.toogleGlobalLoader
  );

  const mutation = useMutation({
    mutationFn: () => {
      return client.post(`/catalog/reseller/price`, {
        product_id: data?.id || undefined,
        price: +price,
        description: description,
        enable: enable,
        id: data?.product_price?.id || undefined,
      });
    },
    onMutate: () => {
      toogleGlobalLoader();
    },
    onSettled: (data, error) => {
      if (data?.data?.success) {
        TMToast.toast.success("Sukses mengubah info produk");
        refetch();
        setTimeout(() => {
          onClose();
        }, 1000);
      } else if (!data?.data?.success || error) {
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
      setPrice(data?.product_price?.price || "");
      setDescription(data?.product_price?.description || "");
      setEnable(!!data?.product_price?.enable);
    } else {
      setPrice("");
      setDescription("");
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
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="priceInput"
          type="text"
          placeholder="Input price..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <span className="block text-right text-[0.775rem] font-bold italic text-gray-400">
          Harga dasar: {Number(data?.price)?.toLocaleString()}
        </span>
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
