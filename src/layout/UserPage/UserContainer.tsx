import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useUser } from "../../context/UserContext";
import { UserPage } from "./UserPage"; 

export const UserContainer = () => {
  const wallet = useTonWallet();
  const [loaded, setLoaded] = useState(false); 
  const { dispatch } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      if (!wallet?.account?.address) return;

      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: wallet.account.address }),
        });

        if (!res.ok) {
          throw new Error("Ошибка при получении пользователя");
        }

        const user = await res.json();
        dispatch({ type: "SET_USER", payload: user });
        setLoaded(true);
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
      }
    };

    fetchUser();
  }, [wallet]);

  if (!loaded) return <div>Загрузка...</div>;

  return <UserPage />;
};
