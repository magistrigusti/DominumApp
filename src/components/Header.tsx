import { TonConnectButton, useTonWallet, toUserFriendlyAddress, CHAIN } from "@tonconnect/ui-react"
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
        <span style={{fontWeight: 'bold', fontSize: '24px'}}>
          Dominum meta spase
        </span>

        <TonConnectButton style={{ marginLeft: 'auto' }} />
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '10px'}}>
        {wallet && 'name' in wallet && (
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '10px'}}>
            <div>
              <div>{wallet.name}</div>

              <div>
                {toUserFriendlyAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET)}
              </div>

              <img src={wallet.imageUrl} height='40px' width="40px" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}