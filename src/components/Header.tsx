import { TonConnectButton, useTonWallet, 
  // toUserFriendlyAddress, CHAIN 
} from "@tonconnect/ui-react"
import { useEffect } from "react";
import IconUser from "../../public/icons/user-icon.png";
import { Link } from "react-router-dom";

type HeaderProps = {
  onWalletStatusChange: (connected: boolean) => void;
};

export const Header = ({ onWalletStatusChange }: HeaderProps) => {
  const wallet = useTonWallet();

  useEffect(() => {
    onWalletStatusChange(!!wallet);
  }, [wallet]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "80%",
      }}
    >
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>
        Dominum meta space
      </span>

      <div style={{ marginLeft: "auto" }}>
        {!wallet ? (
          <TonConnectButton />
        ) : (
          <Link to="/user">
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