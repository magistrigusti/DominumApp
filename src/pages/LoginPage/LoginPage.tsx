import { TonConnectButton } from "@tonconnect/ui-react";
import ImgContract from "../../assets/contract_actral_island.png";


export const LoginPage = () => {
  return (
    <div>
      <TonConnectButton />

      <h2>to go through connecting a wallet.</h2>

      <img src={ImgContract} alt="" />
      
    </div>
  )
}