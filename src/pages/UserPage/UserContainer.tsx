import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useUser } from "../../context/UserContext";

export const UserContainer = () => {
  const wallet = useTonWallet();
  const [tonBalance, setTonBalance] = useState<string | null>(null);
  const { dispatch } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (wallet?.account?.address) {
        const response = await fetch("http://localhost:3001/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: wallet.account.address }),
        });
        const user = await response.json();
        dispatch({ type: "SET_USER", payload: user });

        const tonRes = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${wallet.account.address}`);
        const tonJson = await tonRes.json();
        if (tonJson.ok) {
          const tons = parseFloat(tonJson.result) / 1e9;
          setTonBalance(tons.toFixed(4) + " TON");
        }
      }
    };
    fetchData();
  }, [wallet]);

  return (
    <div>
      {/* Пример использования tonBalance: */}
      {tonBalance && <p>Баланс TON: {tonBalance}</p>}
    </div>
  );
};
