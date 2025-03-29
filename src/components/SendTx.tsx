import { useTonConnectModal, useTonWallet, useTonConnectUI } from "@tonconnect/ui-react"
import { SendTransactionRequest } from "@tonconnect/ui-react";
import { Cell, beginCell, Address } from '@ton/core';
import { waitForTransaction, getJettonWalletAddress } from './tonapi.ts';
import { useState } from 'react';

export const SendTx = () => {
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();
  const [ tonConnectUI ] = useTonConnectUI();
  const [isTxProgress, setIsTxProgress] = useState(false);  

  const onSendTx = async () => {
    setIsTxProgress(true);

    const jw = await getJettonWalletAddress(wallet!.account.address);
    console.log(jw);

    const payload = beginCell()
      .storeUint(0x0f8a7ea5, 32)
      .storeUint(0, 64)
      .storeCoins(1)
      .storeAddress(Address.parse('UQBH1A7LGcrv3_N61S3g_pnLY0bq5I6XUY18oh9wIpCfFq5o'))
      .storeAddress(Address.parse(wallet!.account.address))
      .storeMaybeRef()
      .storeCoins(0)
      .storeMaybeRef()
    .endCell().toBoc().toString('base64')

    const tx: SendTransactionRequest = {
      validUntil: Math.round(Date.now() / 1000) + 60 * 5,
      network: wallet?.account.chain,
      from: wallet!.account.address,
      messages: [
        {
          address: jw,
          amount: '150000000',
          payload
        }
      ]
    }

    const result = await tonConnectUI.sendTransaction(tx, {
      modals: 'all',
      notifications: ['before']
    });
    const cell = Cell.fromBase64(result.boc);
    const event = await waitForTransaction(cell.hash().toString('hex'));
    console.log(event);

    setIsTxProgress(false);
  }

  

  if (!wallet) {
    return <button onClick={ open }>Connect Wallet</button>
  }

  return (
    <>
      <button disabled={isTxProgress} onClick={onSendTx}>{isTxProgress ? "Send transaction" : 'Progress...'}</button>
    </>
  )
}