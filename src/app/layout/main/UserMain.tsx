import { AuthState } from "@tm-wear/app/store/zustand/auth/useAuth";
import React, { useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";

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
      <div className="min-h-[calc(100%_-_89px)] flex-1">{children}</div>
      <Footer />
    </>
  );
}

export default UserMain;
