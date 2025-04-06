import { useEffect } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage/LoginPage";
import { MenuPage } from "./MenuPage/MenuPage";
import { PortalPage } from "./PortalPage/PortalPage";
import { DominumPage } from "./DominumPage/DominumPage";
import { MagisteriumPage } from "./MagisteriumPage/MagisteriumPage";
import { MercatusPage } from "./MercatusPage/MercatusPage";
import { UserContainer } from "./UserPage/UserContainer";

function App() {
  const wallet = useTonWallet();
  const isConnected = !!wallet?.account?.address;
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/");
    }
  }, [isConnected]);

  return (
    <div className="app"> {/* ✅ добавляем обёртку */}
      <div className="page fullscreen container"> {/* ✅ это центр страницы */}
        <Routes>
          {!isConnected && (
            <Route path="*" element={<LoginPage />} />
          )}
  
          {isConnected && (
            <>
              <Route path="/" element={<MenuPage />} />
              <Route path="/portal" element={<PortalPage />} />
              <Route path="/dominum" element={<DominumPage />} />
              <Route path="/magisterium" element={<MagisteriumPage />} />
              <Route path="/mercatus" element={<MercatusPage />} />
              <Route path="/user" element={<UserContainer />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
  
}

export default App;
