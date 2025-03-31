import { TonConnectButton } from "@tonconnect/ui-react";
import ImgContract from "../../assets/contract_actral_island.png";
import { Header } from "../../components/Header";

export const LoginPage = () => {
  return (
    <div>
      <Header /> {/* Только в LoginPage */}
      <TonConnectButton />

      <h2>
        You won't get through here unless <br />
        you use a crypto wallet as a key.
      </h2>

      <img src={ImgContract} alt="" />
    </div>
  );
};
