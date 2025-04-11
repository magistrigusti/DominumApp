/* eslint-disable import/no-extraneous-dependencies */
import { TonClient4  } from '@ton/ton'

export const getHubClient = (): TonClient4 => new TonClient4({ endpoint: 'https://mainnet-v4.tonhubapi.com' })
