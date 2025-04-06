import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/router";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { MenuPage } from "@/pages/MenuPage/MenuPage";
import { PortalPage } from "@/pages/PortalPage/PortalPage";
import { DominumPage } from "@/pages/DominumPage/DominumPage";
import { MagisteriumPage } from "@/pages/MagisteriumPage/MagisteriumPage";
import { MercatusPage } from "@/pages/MercatusPage/MercatusPage";
import { UserContainer } from "@/pages/UserPage/UserContainer";
import '@/styles/index.css'; 

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
      PageToRender = <MenuPage />;
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
    case "user":
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