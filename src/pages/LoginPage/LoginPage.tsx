import { TonConnectButton } from "@tonconnect/ui-react";
import ImgContract from "../../assets/contract_actral_island.png";


export const LoginPage = () => {
  return (
    <div>
      <TonConnectButton />

      <h2>
        Нou won't get through here unless 
        <br />
        you use a crypto wallet as a key.
      </h2>

      <img src={ImgContract} alt="" />
      
    </div>
  )
}