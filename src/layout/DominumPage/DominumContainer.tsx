import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useUser } from "@/context/UserContext";
import { DominumPage } from "./DominumPage";

export const DominumContainer = () => {
  const wallet = useTonWallet();
  const { state, dispatch } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wallet?.account?.address || state.address === wallet.account.address) {
      setLoading(false); // данные уже есть
      return;
    }
  
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: wallet.account.address }),
        });
  
        if (res.ok) {
          const user = await res.json();
          dispatch({ type: "SET_USER", payload: user });
        }
      } catch (err) {
        console.error("Ошибка загрузки пользователя:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [wallet?.account?.address]);
  

  if (loading || !state.address) return <div>Загрузка профиля...</div>;

  return <DominumPage />;
};
                        