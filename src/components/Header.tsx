import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import IconUser from "../../public/icons/user-icon.png";
import DomLogo from "../../public/logo-dom.png";

export const Header = () => {
  const wallet = useTonWallet();
  const isConnected = !!wallet?.account?.address;

  return (
    <div style={{ display: "flex", alignItems: "center", width: "80%" }}>
      <img src={DomLogo} alt="" style={{width: '100px'}} />

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
