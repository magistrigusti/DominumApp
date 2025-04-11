'use client';

import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from 'next/navigation';
import { LoginPage } from "@/app/LoginPage/LoginPage";
import MenuPageRoute from "@/app/MenuPage/page";
import { PortalPage } from "@/app/PortalPage/PortalPage";
import { DominumPage } from "@/app/DominumPage/DominumPage";
import { MagisteriumPage } from "@/app/MagisteriumPage/MagisteriumPage";
import { MercatusPage } from "@/app/MercatusPage/MercatusPage";
import { UserContainer } from "@/app/UserPage/UserContainer";
import { ProfileEditor } from "@/app/UserPage/ProfileEditor/ProfileEditor";

export default function Home() {
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
    );
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
      PageToRender = <MenuPageRoute />;
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
      PageToRender = <ProfileEditor />;
      break;
    default:
      if (typeof window !== "undefined") router.replace("/");
      return null;
  }

  return (
    <div className="app">
      <div className="page fullscreen container">{PageToRender}</div>
    </div>
  );
}
