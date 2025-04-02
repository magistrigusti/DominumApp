import { useEffect } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MenuPage } from "./pages/MenuPage/MenuPage";
import { PortalPage } from "./pages/PortalPage/PortalPage";
import { DominumPage } from "./pages/DominumPage/DominumPage";
import { MagisteriumPage } from "./pages/MagisteriumPage/MagisteriumPage";
import { MercatusPage } from "./pages/MercatusPage/MercatusPage";
import { UserPage } from "./pages/UserPage/UserPage";

function App() {
  const wallet = useTonWallet();
  const isConnected = !!wallet?.account?.address;
  const navigate = useNavigate();

  // ✅ автоматическое перенаправление на / при подключении
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
              <Route path="/user" element={<UserPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
  
}

export default App;
