import { AuthState } from "@tm-wear/app/store/zustand/auth/useAuth";
import React, { useEffect } from "react";
import Header from "../header";

interface Props {
  auth: AuthState;
  children: React.ReactNode;
  title?: string;
  homeUrl?: string;
}

const defaultTitle = "Wear by TheMonograf";

function UserMain({ auth, children, title, homeUrl }: Props) {
  useEffect(() => {
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
  }, [title]);

  return (
    <>
      <Header homeUrl={homeUrl} logout={auth.logout} user={auth.user} />
      {children}
    </>
  );
}

export default UserMain;
