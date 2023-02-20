import React from "react";
import UserMain from "@tm-wear/app/layout/main/UserMain";
import useAuthStore from "@tm-wear/app/store/zustand/auth/useAuth";
import { useParams } from "react-router-dom";
import monograf from "@tm-wear/monograf.config";

function BlogAboutUs() {
  const auth = useAuthStore();
  const { user: reseller } = useParams();

  return (
    <UserMain
      homeUrl={reseller ? `/${reseller}` : "/"}
      title={"Tentang Kami"}
      auth={auth}
    >
      <div className="px-4 py-4 lg:py-6 lg:px-6">
        <div className="mx-auto grid max-w-screen-lg">
          <div className="rounded bg-white p-6">
            <span className="text-4xl font-bold">Tentang Kami</span>
            <br />
            <br />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: monograf.aboutUsLong.replaceAll("\n", "<br />"),
              }}
            />
          </div>
        </div>
      </div>
    </UserMain>
  );
}

export default BlogAboutUs;
