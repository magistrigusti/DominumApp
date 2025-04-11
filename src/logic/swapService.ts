import {
  Asset,
  Factory,
  JettonRoot,
  MAINNET_FACTORY_ADDR,
  Pool,
  PoolType,
  VaultNative,
  VaultJetton,
  SwapParams,
  SwapStep,
  JettonWallet,
} from "@dedust/sdk";

import { Address, toNano, TonClient4, fromNano, Builder, Cell } from "@ton/ton";

export interface readyTonconnectTr {
  address: string;
  amount: string;
  payload: string;
}

export interface IBuildSwapMessage {
  amount: bigint;
  poolAddress: Address;
  queryId?: bigint | number;
  limit?: bigint;
  swapParams?: SwapParams;
  next?: SwapStep;
}

export interface IBuildSwapJettonToTonMessage {
  queryId?: number | bigint;
  destination: Address;
  amount: bigint;
  responseAddress?: Address | null;
  customPayload?: Cell;
  forwardAmount?: bigint;
  forwardPayload?: Cell;
}

export function formatNumber(amount: string): string {
  const amountAsNumber = parseFloat(amount);

  if (amountAsNumber > 0.01) {
    const formattedValue = amount.toString();
    const index = formattedValue.indexOf(".");

    if (index !== -1 && formattedValue.length - index > 2) {
      return formattedValue.slice(0, index + 3);
    }
    return formattedValue;
  }

  const formattedValue = amount.toLocaleString();

  return formattedValue
    .replace(/(\.\d*?[1-9])0+$/, "$1")
    .replace(/\.$/, "")
    .slice(0, 8);
}

export class DedustSwapService {
  private readonly client: TonClient4;

  constructor(client: TonClient4) {
    this.client = client;
  }

  protected static packSwapStep({ poolAddress, limit, next }: SwapStep): Cell {
    const res = new Builder()
      .storeAddress(poolAddress)
      .storeUint(0, 1) // reserved
      .storeCoins(limit ?? 0n)
      .storeMaybeRef(next ? this.packSwapStep(next) : null)
      .endCell();

    return res;
  }

  protected static packSwapParams({
    deadline,
    recipientAddress,
    referralAddress,
    fulfillPayload,
    rejectPayload,
  }: SwapParams): Cell {
    const res = new Builder()
      .storeUint(deadline ?? 0, 32)
      .storeAddress(recipientAddress ?? null)
      .storeAddress(referralAddress ?? null)
      .storeMaybeRef(fulfillPayload)
      .storeMaybeRef(rejectPayload)
      .endCell();

    return res;
  }

  public static buildSwapMessageTonToJetton({
    amount,
    poolAddress,
    queryId,
    limit,
    swapParams,
    next,
  }: IBuildSwapMessage): Cell {
    const body = new Builder()
      .storeUint(VaultNative.SWAP, 32)
      .storeUint(queryId ?? 0, 64)
      .storeCoins(amount)
      .storeAddress(poolAddress)
      .storeUint(0, 1)
      .storeCoins(limit ?? 0)
      .storeMaybeRef(next ? this.packSwapStep(next) : null)
      .storeRef(this.packSwapParams(swapParams ?? {}))
      .endCell();

    return body;
  }

  public static buildSwapMessageJettonWallet({
    amount,
    queryId,
    destination,
    responseAddress,
    customPayload,
    forwardAmount,
    forwardPayload,
  }: IBuildSwapJettonToTonMessage): Cell {
    const body = new Builder()
      .storeUint(JettonWallet.TRANSFER, 32)
      .storeUint(queryId ?? 0, 64)
      .storeCoins(amount)
      .storeAddress(destination)
      .storeAddress(responseAddress)
      .storeMaybeRef(customPayload)
      .storeCoins(forwardAmount ?? 0)
      .storeMaybeRef(forwardPayload)
      .endCell();

    return body;
  }

  public async SwapTonToJetton(
    tokenAddress: string,
    tonAmountIn: string
  ): Promise<readyTonconnectTr | undefined> {
    const tonClient = this.client;

    const factory = tonClient.open(
      Factory.createFromAddress(MAINNET_FACTORY_ADDR)
    );

    const jetton = tonClient.open(
      JettonRoot.createFromAddress(Address.parse(tokenAddress))
    );

    const pool = tonClient.open(
      Pool.createFromAddress(
        await factory.getPoolAddress({
          poolType: PoolType.VOLATILE,
          assets: [Asset.native(), Asset.jetton(jetton.address)],
        })
      )
    );

    const nativeVault = tonClient.open(
      VaultNative.createFromAddress(
        await factory.getVaultAddress(Asset.native())
      )
    );

    const lastBlock = await tonClient.getLastBlock();
    const poolState = await tonClient.getAccountLite(
      lastBlock.last.seqno,
      pool.address
    );

    const vaultState = await tonClient.getAccountLite(
      lastBlock.last.seqno,
      nativeVault.address
    );

    const amountIn = toNano(tonAmountIn);

    const { amountOut: expectedAmoutOut } = await pool.getEstimatedSwapOut({
      assetIn: Asset.native(),
      amountIn,
    });

    // Slippage handling (1%)
    const minAmountOut = (expectedAmoutOut * 99n) / 100n;

    try {
      if (poolState.account.state.type !== "active") {
        throw new Error("Pool not exist");
      }

      if (vaultState.account.state.type !== "active") {
        throw new Error("Native Vault not exist");
      }

      const swapBody = DedustSwapService.buildSwapMessageTonToJetton({
        amount: amountIn,
        poolAddress: pool.address,
        limit: minAmountOut,
      });

      return {
        address: nativeVault.address.toString(),
        amount: (amountIn + toNano("0.5")).toString(),
        payload: swapBody.toBoc().toString("base64"),
      };
    } catch (error) {
      console.error();
      return undefined;
    }
  }

  public async SwapJettonToTon(
    tokenAddress: string,
    jettonAmountIn: string,
    decimals: number,
    userAddress: string
  ): Promise<readyTonconnectTr | undefined> {
    const tonClient = this.client;

    const currentSenderAddress = Address.parse(userAddress);

    const factory = tonClient.open(
      Factory.createFromAddress(MAINNET_FACTORY_ADDR)
    );
    const jettonVault = tonClient.open(
      await factory.getJettonVault(Address.parse(tokenAddress))
    );
    const jettonRoot = tonClient.open(
      JettonRoot.createFromAddress(Address.parse(tokenAddress))
    );
    const jettonWallet = tonClient.open(
      await jettonRoot.getWallet(currentSenderAddress)
    );

    const amountIn = BigInt(Number(jettonAmountIn) * 10 ** decimals);

    const poolJetton = tonClient.open(
      Pool.createFromAddress(
        await factory.getPoolAddress({
          poolType: PoolType.VOLATILE,
          assets: [Asset.jetton(jettonRoot.address), Asset.native()],
        })
      )
    );

    const lastBlock = await tonClient.getLastBlock();
    const poolState = await tonClient.getAccountLite(
      lastBlock.last.seqno,
      poolJetton.address
    );
    const vaultState = await tonClient.getAccountLite(
      lastBlock.last.seqno,
      jettonWallet.address
    );

    const { amountOut: expectedAmountOut } =
      await poolJetton.getEstimatedSwapOut({
        assetIn: Asset.jetton(jettonRoot.address),
        amountIn,
      });

    const minAmountOut = (expectedAmountOut * 99n) / 100n;

    try {
      if (poolState.account.state.type !== "active") {
        throw new Error("Pool is not exist");
      }

      if (vaultState.account.state.type !== "active") {
        throw new Error("Jetton Vault is not exist");
      }

      const swapBody = DedustSwapService.buildSwapMessageJettonWallet({
        amount: amountIn,
        destination: jettonVault.address,
        responseAddress: currentSenderAddress,
        forwardAmount: toNano("0.5"),
        forwardPayload: VaultJetton.createSwapPayload({
          poolAddress: poolJetton.address,
          limit: minAmountOut,
        }),
      });

      return {
        address: jettonWallet.address.toString(),
        amount: toNano("0.5").toString(),
        payload: swapBody.toBoc().toString("base64"),
      };
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  public async SwapJettonToJetton(
    userAddress: string,
    tokenAddress1: string,
    tokenAddress2: string,
    jettonAmountIn: string,
    decimals: number
  ): Promise<readyTonconnectTr | undefined> {
    const tonClient = this.client;

    const currentSenderAddress = Address.parse(userAddress);

    const factory = tonClient.open(
      Factory.createFromAddress(MAINNET_FACTORY_ADDR)
    );
    const jetton1Vault = tonClient.open(
      await factory.getJettonVault(Address.parse(tokenAddress1))
    );

    const jettonRoot = tonClient.open(
      JettonRoot.createFromAddress(Address.parse(tokenAddress1))
    );
    const jettonWallet = tonClient.open(
      await jettonRoot.getWallet(currentSenderAddress)
    );

    const amountIn = BigInt(Number(jettonAmountIn) * 10 ** decimals);

    const JETTON1 = Asset.jetton(Address.parse(tokenAddress1));
    const TON = Asset.native();
    const JETTON2 = Asset.jetton(Address.parse(tokenAddress2));

    const TON_JETOON1_POOL = tonClient.open(
      await factory.getPool(PoolType.VOLATILE, [TON, JETTON1])
    );
    const TON_JETOON2_POOL = tonClient.open(
      await factory.getPool(PoolType.VOLATILE, [TON, JETTON2])
    );

    const lastBlock = await tonClient.getLastBlock();

    const pool1State = await tonClient.getAccountLite(
      lastBlock.last.seqno,
      TON_JETOON1_POOL.address
    );
    const vault1State = await tonClient.getAccountLite(
      lastBlock.last.seqno,
      jettonWallet.address
    );
    const pool2State = await tonClient.getAccountLite(
      lastBlock.last.seqno,
      TON_JETOON2_POOL.address
    );

    const { amountOut: expectedAmountOut1 } =
      await TON_JETOON1_POOL.getEstimatedSwapOut({
        assetIn: Asset.jetton(jettonRoot.address),
        amountIn,
      });

    const minAmountOut = (expectedAmountOut1 * 99n) / 100n;

    try {
      if (pool1State.account.state.type !== "active") {
        throw new Error("Pool is not exist");
      }
      if (vault1State.account.state.type !== "active") {
        throw new Error("Vault is not exist");
      }
      if (pool2State.account.state.type !== "active") {
        throw new Error("Pool is not exist");
      }

      const swapBody = DedustSwapService.buildSwapMessageJettonWallet({
        amount: amountIn,
        destination: jetton1Vault.address,
        responseAddress: currentSenderAddress,
        forwardAmount: toNano("0.5"),
        forwardPayload: VaultJetton.createSwapPayload({
          poolAddress: TON_JETOON1_POOL.address,
          limit: minAmountOut,
          next: { poolAddress: TON_JETOON2_POOL.address },
        }),
      });

      return {
        address: jettonWallet.address.toString(),
        amount: toNano("0.5").toString(),
        payload: swapBody.toBoc().toString("base64"),
      };
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  public async getEstimateSwapOut(
    tokenName1: string,
    tokenName2: string,
    tokenAmount1: string,
    tokenAddress1: string,
    tokenAddress2: string,
    decimals1: number,
    decimals2: number
  ): Promise<string> {
    if (tokenAmount1 === "0" || tokenAmount1 === "0.") {
      return "0";
    }

    if (tokenAmount1 === "") {
      return "";
    }

    const tonClient = this.client;

    const factory = tonClient.open(
      Factory.createFromAddress(MAINNET_FACTORY_ADDR)
    );

    if (tokenName1 === "TON" && tokenName2 !== "TON") {
      const JETTON = Asset.jetton(Address.parse(tokenAddress2));
      const TON = Asset.native();

      const Pool = tonClient.open(
        await factory.getPool(PoolType.VOLATILE, [TON, JETTON])
      );

      const { amountOut } = await Pool.getEstimatedSwapOut({
        assetIn: TON,
        amountIn: toNano(tokenAmount1),
      });

      const numberAmount: number = Number(amountOut) / 10 ** decimals2;

      return formatNumber(String(numberAmount));
    }

    if (tokenName1 !== "TON" && tokenName2 === "TON") {
      const JETTON = Asset.jetton(Address.parse(tokenAddress1));
      const TON = Asset.native();

      const Pool = tonClient.open(
        await factory.getPool(PoolType.VOLATILE, [TON, JETTON])
      );

      const { amountOut } = await Pool.getEstimatedSwapOut({
        assetIn: JETTON,
        amountIn: BigInt(Number(tokenAmount1) * 10 ** decimals1),
      });

      const stringAmount = fromNano(amountOut);

      return formatNumber(stringAmount);
    }
    if (tokenName1 !== "TON" && tokenName2 !== "TON") {
      const JETTON1 = Asset.jetton(Address.parse(tokenAddress1));
      const JETTON2 = Asset.jetton(Address.parse(tokenAddress2));
      const TON = Asset.native();

      const TON_JETOON1_POOL = tonClient.open(
        await factory.getPool(PoolType.VOLATILE, [TON, JETTON1])
      );
      const TON_JETOON2_POOL = tonClient.open(
        await factory.getPool(PoolType.VOLATILE, [TON, JETTON2])
      );

      const { amountOut: amountOut1 } =
        await TON_JETOON1_POOL.getEstimatedSwapOut({
          assetIn: JETTON1,
          amountIn: BigInt(Number(tokenAmount1) * 10 ** decimals1),
        });

      const { amountOut: amountOut2 } =
        await TON_JETOON2_POOL.getEstimatedSwapOut({
          assetIn: TON,
          amountIn: amountOut1,
        });

      const numberValue: number = Number(amountOut2) / 10 ** decimals2;

      return formatNumber(String(numberValue));
    }

    return "";
  }
}
