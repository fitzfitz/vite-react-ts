import React from "react";
import { useParams } from "react-router-dom";
import UserMain from "@tm-wear/app/layout/main/UserMain";
import useAuthStore from "@tm-wear/app/store/zustand/auth/useAuth";
import ProductList from "@tm-wear/app/components/pages/product/List";

function HomeScreen() {
  const auth = useAuthStore();
  const { user: reseller } = useParams();

  return (
    <UserMain homeUrl={reseller ? `/@${reseller}` : "/"} auth={auth}>
      <ProductList user={reseller || ""} />
    </UserMain>
  );
}

export default HomeScreen;
