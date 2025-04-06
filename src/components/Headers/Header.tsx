import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import Link from "next/link";

export const Header = () => {
  const wallet = useTonWallet();
  const isConnected = !!wallet?.account?.address;

  return (
    <div style={{ display: "flex", alignItems: "center", width: "80%" }}>

      <div style={{ marginLeft: "auto" }}>
        <TonConnectButton />
      </div>
    </div>
  );
};
