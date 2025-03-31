import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import IconUser from "../../public/icons/user-icon.png";

export const Header = () => {
  const wallet = useTonWallet();
  const isConnected = !!wallet?.account?.address;

  return (
    <div style={{ display: "flex", alignItems: "center", width: "80%" }}>
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>
        Dominum meta space
      </span>

      <div style={{ marginLeft: "auto" }}>
        {!isConnected ? (
          <TonConnectButton />
        ) : (
          <Link to="/">
            <img
              src={IconUser}
              alt="User Profile"
              height="36px"
              width="36"
              style={{
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </Link>
        )}
      </div>
    </div>
  );
};
