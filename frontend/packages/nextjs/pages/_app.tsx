import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Jura, M_PLUS_1_Code, Orbitron } from "next/font/google";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

const oribtron = Orbitron({
  variable: "--font-oribtron",
  preload: false,
});
const jura = Jura({
  variable: "--font-jura",
  preload: false,
});

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className={`${oribtron.variable} flex flex-col min-h-screen`}>
        <Header />
        <main className={`${oribtron.variable} ${jura.variable} font-bold relative flex flex-col flex-1`}>
          <Component {...pageProps} />
        </main>
      </div>
      <Toaster />
    </>
  );
};

const ScaffoldEthAppWithProviders = (props: AppProps) => {
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();
  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        theme={isDarkTheme ? darkTheme() : lightTheme()}
      >
        <ScaffoldEthApp {...props} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthAppWithProviders;
