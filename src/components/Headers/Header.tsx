import { TonConnectButton} from "@tonconnect/ui-react";

export const Header = () => {

  return (
    <div style={{ display: "flex", alignItems: "center", width: "80%" }}>

      <div style={{ marginLeft: "auto" }}>
        <TonConnectButton />
      </div>
    </div>
  );
};
