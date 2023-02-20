import React from "react";
import useProductListStore from "@tm-wear/app/store/zustand/productList/useProductList";
import { BiSearchAlt } from "react-icons/bi";

const SearchDialog = () => {
  const {
    setFilterProductList: setFilter,
    filter: { keyword },
  } = useProductListStore();

  return (
    <div className="mx-auto flex flex-1 justify-end pr-4 pl-8">
      <div className="relative flex h-8 w-full">
        <input
          value={keyword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFilter({ keyword: event.target.value })
          }
          placeholder="Cari produk..."
          className="form-input text-xs+ peer h-full w-full rounded-full border-none bg-orange-50 px-4 pl-10 text-slate-800 transition-all duration-200 focus:ring focus:ring-orange-500"
          type="text"
        />
        <div className="peer-focus:text-blue absolute flex h-full w-10 items-center justify-center text-gray-500">
          <BiSearchAlt size={"19px"} />
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
