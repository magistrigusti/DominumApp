import { TonConnectButton, useTonWallet, 
  // toUserFriendlyAddress, CHAIN 
} from "@tonconnect/ui-react"
import { useEffect } from "react";

type HeaderProps = {
  onWalletStatusChange: (connected: boolean) => void;
}

export const Header = ({onWalletStatusChange}: HeaderProps) => {
  const wallet = useTonWallet();

  useEffect(() => {
    onWalletStatusChange(!!wallet);
  }, [wallet]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <span style={{fontWeight: 'bold', fontSize: '18px'}}>
          Dominum meta spase
        </span>

        <TonConnectButton style={{ marginLeft: 'auto' }} />
      </div>
    </>
  )
}