/* eslint-disable import/no-extraneous-dependencies */
import { FC } from "react";
import WebAppSDK from "@twa-dev/sdk";
import s from "./layout.module.scss";
import { HeaderPanel, PageWrapper } from "@delab-team/de-ui";
import { TonConnectButton, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

interface LayoutProps {
  children: React.ReactNode;
}

const wrapperTgStyles = {
  headerStyles: { background: "var(--tg-theme-secondary-bg-color)" },
};
const headerTgStyles = {
  header: { background: "var(--tg-theme-secondary-bg-color)" },
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const address = useTonAddress();
  

  return (
    <PageWrapper
      className={s.wrapper}
      headerClassName={s.headerClass}
      containerWidth="500px"
      tgStyles={wrapperTgStyles}
      header={
        <>
          <HeaderPanel
            title=""
            containerWidth="440px"
            className={s.header}
            variant="black"
            tgStyles={headerTgStyles}
            actionLeft={
              <div onClick={() => {
                window.open(`https://tonviewer.com/${address}`)
              }}>
                <img
                  className={s.logo}
                  src={`https://t.me/i/userpic/320/${WebAppSDK?.initDataUnsafe?.user?.username}.jpg`}
                  alt="avatar"
                />
              </div>
            }
            actionRight={
              <>
                <TonConnectButton />
              </>
            }
          />
        </>
      }
      footer={<></>}
      content={<div className={s.content}>{children}</div>}
      pageTitle="Template Example"
    />
  );
};
