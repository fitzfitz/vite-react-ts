import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import LoginScreen from "./pages/auth/login/page";
import HomeScreen from "./pages/home/page";
import ProductDetailScreen from "./pages/product/[slug]/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/@:user",
    element: <HomeScreen />,
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

function App() {
  return (
    <>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
        }}
      >
        <RouterProvider router={router} />
      </SWRConfig>
    </>
  );
}

export default App;
