import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useUser } from "@/context/UserContext";

export const UserLoader = ({ children }: { children: React.ReactNode }) => {
  const wallet = useTonWallet();
  const { dispatch } = useUser();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!wallet?.account?.address) return; // 👈 защита от раннего вызова

      try {
        const res = await fetch("/api/user/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: wallet.account.address }),
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error("Ошибка при получении пользователя: " + errText);
        }

        const user = await res.json();
        dispatch({ type: "SET_USER", payload: user });
        setLoaded(true);
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
      }
    };

    if (wallet?.account?.address) {
      fetchUser();
    }
  }, [wallet]);

  // 👉 если кошелёк не подключен, ничего не рендерим (или можешь показать LoginPage)
  if (!wallet?.account?.address) {
    return <div>Ожидание подключения кошелька...</div>;
  }

  if (!loaded) {
    return <div>Загрузка пользователя...</div>;
  }

  return <>{children}</>;
};
