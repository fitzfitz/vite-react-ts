import React from "react";
import { FcHome, FcKey, FcLock, FcShop, FcFilingCabinet } from "react-icons/fc";
import { AuthUserDataType } from "@tm-wear/app/api/types/auth";
import styles from "./Header.module.scss";
import TMAvatar from "@tm-wear/components/TMAvatar";
import TMLink from "@tm-wear/components/TMLink";

type Props = {
  user?: AuthUserDataType | null;
  homeUrl?: string;
  logout?: () => void;
};

function Header({ user, homeUrl, logout }: Props) {
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <TMLink to={homeUrl ? homeUrl : "/"} className="flex items-center">
            <span className={styles.logoText}>
              <FcShop className="mr-2" />
              The Monograf
            </span>
          </TMLink>

          <div className={styles.navListContainer}>
            <ul className={styles.navList}>
              <li>
                <TMLink
                  title="Lihat semua produk"
                  to={`/`}
                  className={styles.navListItem}
                >
                  <FcHome size={"19px"} />
                </TMLink>
              </li>
              {!user ? (
                <li>
                  <TMLink
                    title="Login Reseller"
                    to={`/login?lastPage=${location.pathname}`}
                    className={styles.navListItem}
                  >
                    <FcLock size={"19px"} />
                  </TMLink>
                </li>
              ) : null}
              {user ? (
                <li>
                  <TMLink
                    title="Lihat produk anda"
                    to={`/@${user.username}`}
                    className={styles.navListItem}
                  >
                    <FcFilingCabinet size={"19px"} />
                  </TMLink>
                </li>
              ) : null}
              {user ? (
                <li>
                  <button
                    title="Logout Reseller"
                    className={styles.navListItem}
                    onClick={logout}
                  >
                    <FcKey size={"19px"} />
                  </button>
                </li>
              ) : null}
              {user ? (
                <li>
                  <div className={styles.navListItem}>
                    <TMAvatar
                      image={
                        "https://avatars.dicebear.com/api/bottts/:dans.svg"
                      }
                      fullname={user.name}
                      onlineIndicator
                      size="xs"
                    />
                  </div>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
