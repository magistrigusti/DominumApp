import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useUser } from "@/context/UserContext";
import { DominumPage } from "./DominumPage";

export const DominumContainer = () => {
  const wallet = useTonWallet();
  const { state, dispatch } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!wallet?.account?.address) return;

      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: wallet.account.address }),
        });

        if (res.ok) {
          const data = await res.json();
          dispatch({ type: "SET_USER", payload: data });
        }
      } catch (err) {
        console.error("Ошибка загрузки пользователя:", err);
      }

      setLoading(false);
    };

    fetchUser();
  }, [wallet?.account?.address]);

  if (loading || !state.address) return <div>Загрузка профиля...</div>;

  return <DominumPage />;
};
