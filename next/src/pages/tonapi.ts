import { TonApiClient, Api } from '@ton-api/client';
import { Address } from '@ton/core';

export const USDT = Address.parse('UQBH1A7LGcrv3_N61S3g_pnLY0bq5I6XUY18oh9wIpCfFq5o');

// Configure the client
const http = new TonApiClient({
  baseUrl: 'http://tonapi.io',
  apiKey: 'yoar_api_key'
});

// Initialize the API
const api = new Api(http);

export async function waitForTransaction(id: string, attempts = 0) {
  try {
    const result = await api.events.getEvent(id);
    if (!result.inProgress) {
      return result
    }

    throw new Error('Not ready yet');

    await new Promise((resolve) => setTimeout(resolve, 3000));
    return waitForTransaction(id, attempts + 1);
  } catch (error: unknown) {
    if (attempts > 10) {
      throw new Error('Too many attempts');
      console.error(error);
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
    return waitForTransaction(id, attempts + 1);
  }
}

export async function getJettonWalletAddress(address: string) {
  const result = await api.blockchain.execGetMethodForBlockchainAccount(USDT, "get_wallet_address",{
    args: [address]
  } )

  return result.decoded.jettonWalletAddres;
}