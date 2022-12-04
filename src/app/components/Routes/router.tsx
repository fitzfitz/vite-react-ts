import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginScreen from "@tm-wear/pages/auth/login/page";
import HomeScreen from "@tm-wear/pages/home/page";
import ProductDetailScreen from "@tm-wear/pages/product/[slug]/page";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen key={"home-base"} />,
  },
  {
    path: "/@:user",
    element: <HomeScreen key={"home-user"} />,
  },
  {
    path: "/product/:slug",
    element: <ProductDetailScreen />,
  },
  {
    path: "/@:user/product/:slug",
    element: <ProductDetailScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
]);

const AppRouterProvider = () => <RouterProvider router={appRouter} />;

export default AppRouterProvider;
