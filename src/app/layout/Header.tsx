import React from "react";
import { FcShop } from "react-icons/fc";
import { BiLogOutCircle, BiUser } from "react-icons/bi";
import { AuthUserDataType } from "@tm-wear/app/api/types/auth";
import { Link } from "react-router-dom";
import TMLink from "@tm-wear/components/TMLink";
import monograf from "@tm-wear/monograf.config";
import useMaster from "@tm-wear/api/hooks";
import SearchDialog from "./widgets/SearchDialog";

type Props = {
  user?: AuthUserDataType | null;
  homeUrl?: string;
  logout?: () => void;
};

function Header({ user, homeUrl, logout }: Props) {
  const { useCategories } = useMaster();
  const { data: categories } = useCategories();

  return (
    <header>
      <nav className="sticky bg-white px-4 py-2.5 shadow lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <TMLink to={homeUrl ? homeUrl : "/"} className="flex items-center">
            <span className="flex items-center self-center whitespace-nowrap font-dancingScript text-xl font-semibold text-gray-700">
              <FcShop className="mr-2" />
              {monograf.name}
            </span>
          </TMLink>

          <SearchDialog />

          <div className="flex w-auto items-center justify-between lg:order-1">
            <ul className="mt-0 flex flex-row items-center font-normal lg:flex-row lg:space-x-8">
              {!user ? (
                <li>
                  <TMLink
                    title="Login Reseller"
                    to={`/login?lastPage=${location.pathname}`}
                    className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-700 transition hover:border-orange-400 hover:bg-orange-400 hover:text-white lg:bg-transparent"
                  >
                    <BiUser />
                    Masuk
                  </TMLink>
                </li>
              ) : null}
              {user ? (
                <>
                  <li>
                    <TMLink
                      title="Semua produk"
                      to={`/`}
                      className="group block rounded py-2 pr-3 pl-3 text-sm text-gray-600 lg:bg-transparent lg:p-0"
                    >
                      Semua produk
                      <span className="block h-0.5 max-w-0 bg-orange-500 transition-all duration-500 group-hover:max-w-full"></span>
                    </TMLink>
                  </li>
                  <li>
                    <TMLink
                      title="Lihat produk anda"
                      to={`/${user.username}`}
                      className="group block rounded py-2 pr-3 pl-3 text-sm text-gray-600 lg:bg-transparent lg:p-0"
                    >
                      Produk anda
                      <span className="block h-0.5 max-w-0 bg-orange-500 transition-all duration-500 group-hover:max-w-full"></span>
                    </TMLink>
                  </li>
                  {/* <li>
                    <div className="block rounded py-2 pr-3 pl-3 text-sm lg:bg-transparent lg:p-0">
                      <TMAvatar
                        image={
                          "https://avatars.dicebear.com/api/bottts/:dans.svg"
                        }
                        fullname={user.name}
                        onlineIndicator
                        size="xs"
                      />
                    </div>
                  </li> */}
                  <li>
                    <button
                      title="Logout Reseller"
                      className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-700 transition hover:border-orange-400 hover:bg-orange-400 hover:text-white lg:bg-transparent"
                      onClick={logout}
                    >
                      <BiLogOutCircle />
                      Keluar
                    </button>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
      <nav className="sticky bg-gray-50 px-4 py-2.5 shadow lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-2">
          <span className="text-xs text-gray-800">Categories:</span>
          {categories?.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group text-xs text-gray-500"
            >
              {category.category}
              <span className="block h-[1px] max-w-0 bg-orange-500 transition-all duration-500 group-hover:max-w-full"></span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
