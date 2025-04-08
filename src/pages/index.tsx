import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/router";
import { LoginPage } from "@/layout/LoginPage/LoginPage";
import { MenuContainer } from "@/layout/MenuPage/MenuContainer";
import { PortalPage } from "@/layout/PortalPage/PortalPage";
import { DominumPage } from "@/layout/DominumPage/DominumPage";
import { MagisteriumPage } from "@/layout/MagisteriumPage/MagisteriumPage";
import { MercatusPage } from "@/layout/MercatusPage/MercatusPage";
import { UserContainer } from "@/layout/UserPage/UserContainer";

export default function Index() {
  const wallet = useTonWallet();
  const isConnected = !!wallet?.account?.address;

  const router = useRouter();
  const [route, setRoute] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRoute(window.location.pathname);
    }
  }, []);

  if (!route) {
    return (
      <div className="app">
        <div className="page fullscreen container">
          <div className="loader">Loading....</div>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="app">
        <div className="page fullscreen container">
          <LoginPage />
        </div>
      </div>
    );
  }

  let PageToRender;

  switch (route) {
    case "/":
      PageToRender = <MenuContainer />;
      break;
    case "/dominum":
      PageToRender = <DominumPage />;
      break;
    case "/magisterium":
      PageToRender = <MagisteriumPage />;
      break;
    case "/mercatus":
      PageToRender = <MercatusPage />;
      break;
    case "/portal":
      PageToRender = <PortalPage />;
      break;
    case "/user":
      PageToRender = <UserContainer />;
      break;
    default:
      if (typeof window !== "undefined") router.replace("/");
      return null;
  }

  return (
    <div className="app">
      <div className="page fullscreen container">{PageToRender}</div>
    </div>
  )

}