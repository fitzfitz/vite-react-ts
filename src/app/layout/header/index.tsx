import React from "react";
import { FcHome, FcKey, FcLock } from "react-icons/fc";
import { TbHanger } from "react-icons/tb";
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
              <TbHanger className="-rotate-90 text-blue-400" />
              The Monograf
            </span>
          </TMLink>
          <div className={styles.navListContainer}>
            <ul className={styles.navList}>
              <li>
                <a href="/" className={styles.navListItem} aria-current="page">
                  <FcHome size={"19px"} />
                </a>
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
                <>
                  <li>
                    <button
                      title="Logout Reseller"
                      className={styles.navListItem}
                      onClick={logout}
                    >
                      <FcKey size={"19px"} />
                    </button>
                  </li>
                  <li>
                    <div className={styles.navListItem}>
                      <TMAvatar
                        image={
                          "https://avatars.dicebear.com/api/bottts/:dans.svg"
                        }
                        fullname={user.name}
                        isOnline
                        size="xs"
                      />
                    </div>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
