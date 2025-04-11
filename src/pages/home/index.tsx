/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { FC, useEffect, useState } from "react";
import WebAppSDK from "@twa-dev/sdk";
import { motion } from "framer-motion";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { useDebounce } from "usehooks-ts";
import { Address } from "@ton/ton";
import s from "./home.module.scss";
import { Amount } from "../../components/amount";
import { SvgSelector } from "../../components/svgSelector";
import { AssetType } from "../../types/assetType";
import { getHubClient } from "../../utils/getClient";
import { SelectAsset } from "../../components/selectAsset";
import { DedustApi } from "../../logic/dedustApi";
import { TonApi } from "../../logic/tonapi";
import { DedustSwapService } from "../../logic/swapService";

const initialSwapToken1: AssetType = {
  token: "TON",
  decimals: 9,
  tokenLogo: "https://s2.coinmarketcap.com/static/img/coins/200x200/11419.png",
  tokenAddress: [
    "0:9a8da514d575d20234c3fb1395ee9138f5f1ad838abc905dc42c2389b46bd015",
    "0:436b4ff60f7bacf75f70d422cfb6b5ae7cd2846f0f3553ae8bcc798258923608",
  ],
};

const initialSwapToken2: AssetType = {
  token: "DFC",
  decimals: 9,
  tokenLogo: "https://assets.dedust.io/images/dfc.webp",
  tokenAddress: [
    "0:f6eb371de82aa9cfb5b22ca547f31fdc0fa0fbb41ae89ba84a73272ff0bf2157",
    "0:c288b9102a934e1a93435f6a194470da340559a95e9c9816c682ccff2215149d",
  ],
};

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [modalOpen, setModalOpen] = useState(false);
  const [isValidAmount, setIsValidAmount] = useState<boolean>(true);
  const [swapped, setSwapped] = useState(false);
  const [isFromAssets, setIsFromAssets] = useState(true);
  const [estimateLoading, setEstimateLoading] = useState(true);
  const [swapLoading, setSwapLoading] = useState(false);

  // assets
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [dedustAssets, setDedustAssets] = useState<AssetType[] | undefined>(
    undefined
  );

  const [token1, setToken1] = useState<AssetType>(initialSwapToken1);
  const [tokenBalance1, setTokenBalance1] = useState<string>("0");

  const [token2, setToken2] = useState<AssetType>(initialSwapToken2);
  const [tokenBalance2, setTokenBalance2] = useState<string>("");

  const userAddress = useTonAddress();

  const SwitchHandler = () => {
    const currentToken1 = token1;
    const currentToken2 = token2;

    setToken1(currentToken2);
    setToken2(currentToken1);

    setSwapped(!swapped);
  };
  const variants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  // main button

  const enableBtn = () => {
    WebAppSDK.MainButton.enable();
    WebAppSDK.MainButton.show();
    WebAppSDK.MainButton.text = "Swap";
    WebAppSDK.MainButton.textColor = WebAppSDK.themeParams.button_text_color;
    WebAppSDK.MainButton.color = WebAppSDK.themeParams.button_color;
    setIsValidAmount(true);

    if (
      !tonConnectUI.connected ||
      Number(tokenBalance1) > Number(token1.balance)
    ) {
      setIsValidAmount(false);
      WebAppSDK.HapticFeedback.notificationOccurred("warning");
      WebAppSDK.MainButton.disable();
      WebAppSDK.MainButton.text = "Disabled";
      WebAppSDK.MainButton.textColor = WebAppSDK.themeParams.hint_color;
      WebAppSDK.MainButton.color = WebAppSDK.themeParams.secondary_bg_color;
    }
  };

  useEffect(() => {
    enableBtn();

    const handleBtnClick = () => {
      WebAppSDK.HapticFeedback.impactOccurred("medium");
      makeSwap()
      WebAppSDK.MainButton.hideProgress();
    };

    if (modalOpen) {
      WebAppSDK.MainButton.hide();
    }

    WebAppSDK.MainButton.onClick(handleBtnClick);

    return () => {
      WebAppSDK.MainButton.offClick(handleBtnClick);
    };
  }, [tonConnectUI.connected, tokenBalance1, token1, token2, modalOpen]);

  // assets

  const dedustApi = new DedustApi();
  const tonapi = new TonApi();

  async function getAssets() {
    try {
      if (!userAddress) {
        return;
      }

      const assets = await dedustApi.getAssets();
      const balances = await tonapi.getAllJettonsBalances(userAddress);
      const baseInfo = await tonapi.getHumanFriendlyInfoDto(userAddress);

      if (!assets || !balances || !baseInfo) {
        console.error("assets api error");
        return;
      }

      const assetsTypeTokens: AssetType[] = assets.map((token) => ({
        token: token.symbol,
        tokenLogo: token.image,
        tokenAddress: [token.address ?? ""],
        decimals: token.decimals,
      }));

      const updatedAssets: AssetType[] = assetsTypeTokens.map((asset) => {
        if (asset.token === "TON") {
          return {
            ...asset,
            balance: String(baseInfo.balance / 10 ** 9),
          };
        }

        const jettonBalance = balances.balances.find(
          (jet) =>
            Address.parse(jet.jetton?.address ?? "").toString({
              bounceable: false,
            }) ===
            Address.parse(asset.tokenAddress[0] ?? "").toString({
              bounceable: false,
            })
        );

        if (jettonBalance) {
          return {
            ...asset,
            balance: String(
              Number(jettonBalance.balance) /
                10 ** (jettonBalance.jetton?.decimals ?? 9)
            ),
          };
        }

        return {
          ...asset,
          balance: "0",
        };
      });

      setDedustAssets(updatedAssets);
      setToken1(updatedAssets[0]);
      setToken2(updatedAssets[1]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAssets();
  }, [userAddress]);

  // get estimate
  const dedustService = new DedustSwapService(getHubClient());

  const debouncedTokenBalance1 = useDebounce(tokenBalance1, 500);

  const getEstimate = async () => {
    try {
      setEstimateLoading(true);
      const estimateBalance = await dedustService.getEstimateSwapOut(
        token1.token,
        token2.token,
        debouncedTokenBalance1,
        token1.tokenAddress[0],
        token2.tokenAddress[0],
        token1.decimals ?? 9,
        token2.decimals ?? 9
      );

      setTokenBalance2(estimateBalance);
      setEstimateLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEstimate();
  }, [token1, token2, debouncedTokenBalance1]);

  const makeSwap = async () => {
    if (token1.token === token2.token) {
      console.error("Same tokens");
      WebAppSDK.MainButton.hideProgress();
      return;
    }
    if (token1.token === "TON" && token2.token !== "TON") {
      try {
        WebAppSDK.MainButton.showProgress();

        const swapObj = await dedustService.SwapTonToJetton(token2.tokenAddress[0], tokenBalance1)

        if (!swapObj) {
          console.error('swapObj error')
          return
        }

        const tr = {
          validUntil: Math.floor(Date.now() / 1000) + 90,
          messages: [
            {
              address: swapObj.address,
              amount: swapObj.amount,
              payload: swapObj.payload
            }
          ]
        }

        const tx = await tonConnectUI.sendTransaction(tr)

      } catch (err) {
        console.error(err);
      }
    } else if (token1.token !== "TON" && token2.token === "TON") {
      try {
        WebAppSDK.MainButton.showProgress();

        const swapObj = await dedustService.SwapJettonToTon(token1.tokenAddress[0], tokenBalance1, token1.decimals ?? 9, userAddress)

        if (!swapObj) {
          console.error('swapObj error')
          return
        }

        const tr = {
          validUntil: Math.floor(Date.now() / 1000) + 90,
          messages: [
            {
              address: swapObj.address,
              amount: swapObj.amount,
              payload: swapObj.payload
            }
          ]
        }

        const tx = await tonConnectUI.sendTransaction(tr)

      } catch (err) {
        console.error(err);
      }
    } else if (token1.token !== "TON" && token2.token !== "TON") {
      try {
        WebAppSDK.MainButton.showProgress();

        const swapObj = await dedustService.SwapJettonToJetton(userAddress, token1.tokenAddress[0], token2.tokenAddress[0], tokenBalance1, token1.decimals ?? 9)

        if (!swapObj) {
          console.error('swapObj error')
          return
        }

        const tr = {
          validUntil: Math.floor(Date.now() / 1000) + 90,
          messages: [
            {
              address: swapObj.address,
              amount: swapObj.amount,
              payload: swapObj.payload
            }
          ]
        }

        const tx = await tonConnectUI.sendTransaction(tr)

      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={s.swapWrapper}>
      <div className={s.modalColumn}>
        <div className={s.modalContent}>
          <Amount
            value={tokenBalance1}
            setValue={setTokenBalance1}
            selectedValue={token1}
            setIsValidAmount={setIsValidAmount}
            setIsFromAssets={setIsFromAssets}
            isFromAssets={isFromAssets}
            setEstimateLoading={setEstimateLoading}
            isModalOpen={modalOpen}
            setModalOpen={setModalOpen}
            isValidAmount={isValidAmount}
          />
          <div className={`${s.modalContentSwap}`} onClick={SwitchHandler}>
            <motion.button
              animate={swapped ? "open" : "closed"}
              variants={variants}
              className={`${s.swapButtonWrapper}`}
            >
              <SvgSelector id="swap-5" />
            </motion.button>
          </div>
          <Amount
            value={tokenBalance2}
            setValue={setTokenBalance2}
            selectedValue={token2}
            onlyRead
            setIsFromAssets={setIsFromAssets}
            isFromAssets={isFromAssets}
            estimateLoading={estimateLoading}
            isModalOpen={modalOpen}
            setModalOpen={setModalOpen}
            isValidAmount={isValidAmount}
          />
        </div>

        {modalOpen && (
          <SelectAsset
            tokensData={
              isFromAssets
                ? dedustAssets?.filter(
                    (el) =>
                      !el.token
                        .toLocaleLowerCase()
                        .includes(token2.token.toLocaleLowerCase())
                  )
                : dedustAssets?.filter(
                    (el) =>
                      !el.token
                        .toLocaleLowerCase()
                        .includes(token1.token.toLocaleLowerCase())
                  )
            }
            swapData={isFromAssets ? token1 : token2}
            setSwapData={isFromAssets ? setToken1 : setToken2}
            closeModal={() => {
              WebAppSDK.HapticFeedback.impactOccurred("medium");
              setModalOpen(false);
            }}
            setIsModalOpen={setModalOpen}
            isModalOpen={modalOpen}
          />
        )}
      </div>
    </div>
  );
};
