import React from "react";

import Provider from "@tm-wear/app/store/zustand/provider";
import AppRouterProvider from "@tm-wear/app/components/Routes/router";
import GlobalLoader from "./app/components/global/GlobalLoader";
import { TMToast } from "./app/components/Toaster";

function AppTanstack() {
  return (
    <>
      <Provider>
        <AppRouterProvider />

        {/* Global components */}
        <GlobalLoader />
        <TMToast.Toaster position="top-right" reverseOrder={false} />
      </Provider>
    </>
  );
}

export default AppTanstack;
