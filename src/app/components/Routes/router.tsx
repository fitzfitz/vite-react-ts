import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginScreen from "@tm-wear/pages/auth/login/page";
import HomeScreen from "@tm-wear/pages/home/page";
import ProductDetailScreen from "@tm-wear/pages/product/[slug]/page";
import BlogAboutUs from "@tm-wear/pages/blog/about-us/page";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeScreen key={"home-base"} />,
//   },
//   {
//     path: "/@:user",
//     element: <HomeScreen key={"home-user"} />,
//   },
//   {
//     path: "/product/:slug",
//     element: <ProductDetailScreen />,
//   },
//   {
//     path: "/@:user/product/:slug",
//     element: <ProductDetailScreen />,
//   },
//   {
//     path: "/login",
//     element: <LoginScreen />,
//   },

//   // blog
//   {
//     path: "blog/about-us",
//     element: <BlogAboutUs />,
//   },
// ]);

// const AppRouterProvider = () => <RouterProvider router={appRouter} />;
const AppRouterProvider = () => (
  <Routes>
    <Route path="/">
      <Route index element={<HomeScreen key={"home-base"} />} />
      <Route path=":user" element={<HomeScreen key={"home-base"} />} />
      <Route path="product/:slug" element={<ProductDetailScreen />} />
      <Route path=":user/product/:slug" element={<ProductDetailScreen />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="blog/about-us" element={<BlogAboutUs />} />
    </Route>
  </Routes>
);

export default AppRouterProvider;
