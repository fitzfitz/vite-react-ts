import React from "react";
import { useParams } from "react-router-dom";
import UserMain from "@tm-wear/app/layout/main/UserMain";
import useAuthStore from "@tm-wear/app/store/zustand/auth/useAuth";
import ProductList from "@tm-wear/app/components/pages/product/List";
import Categories from "./components/Categories";

function HomeScreen() {
  const auth = useAuthStore();
  const { user: reseller } = useParams();

  return (
    <UserMain homeUrl={reseller ? `/${reseller}` : "/"} auth={auth}>
      <div className="px-4 py-4 lg:py-6 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl">
          <Categories />
        </div>
      </div>
      <ProductList user={reseller || ""} />
    </UserMain>
  );
}

export default HomeScreen;
