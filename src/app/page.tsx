import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/router";
import { LoginPage } from "@/app/pages/LoginPage/LoginPage";
import { MenuContainer } from "@/app/pages/MenuPage/MenuContainer";
import { PortalPage } from "@/app/pages/PortalPage/PortalPage";
import { DominumPage } from "@/app/pages/DominumPage/DominumPage";
import { MagisteriumPage } from "@/app/pages/MagisteriumPage/MagisteriumPage";
import { MercatusPage } from "@/app/pages/MercatusPage/MercatusPage";
import { UserContainer } from "@/app/pages/UserPage/UserContainer";
import { ProfileEditor } from "@/app/pages/UserPage/ProfileEditor/ProfileEditor";

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
    case "/user/editor":
      PageToRender= <ProfileEditor />;
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