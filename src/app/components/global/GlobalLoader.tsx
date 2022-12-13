import React from "react";
import useLayoutStore from "@tm-wear/app/store/zustand/layout/useLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function GlobalLoader() {
  const isOpenGlobalLoader = useLayoutStore(
    (state) => state.isOpenGlobalLoader
  );
  return isOpenGlobalLoader ? (
    <div className="fixed top-0 left-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/70 text-white">
      <AiOutlineLoading3Quarters className="animate-spin" size={"30px"} />
    </div>
  ) : null;
}

export default GlobalLoader;
