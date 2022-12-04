import React from "react";

import Provider from "@tm-wear/app/store/zustand/provider";
import AppRouterProvider from "@tm-wear/app/components/Routes/router";

function AppTanstack() {
  return (
    <>
      <Provider>
        <AppRouterProvider />
      </Provider>
    </>
  );
}

export default AppTanstack;
