import { TonConnectButton, useTonWallet, toUserFriendlyAddress, CHAIN } from "@tonconnect/ui-react"

export const Header = () => {
  const wallet = useTonWallet();

  return (
    <>
      <div style={{ display: 'flex' }}>
        <span>Title</span>
        <TonConnectButton style={{ marginLeft: 'auto' }} />
      </div>
      <div>
        {wallet && ('name' in wallet ? <>
          <div>{wallet.name}</div>
          <div>{toUserFriendlyAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET)}</div>
          <img src={wallet.imageUrl} height='40px' width="40px" />
        </> : 'Unknow wallet')}
      </div>
    </>
  )
}