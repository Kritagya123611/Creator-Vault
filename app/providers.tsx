"use client";

import { WagmiConfig, createConfig, http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "@rainbow-me/rainbowkit/styles.css";
require("@solana/wallet-adapter-react-ui/styles.css");

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "CreatorVault",
  projectId: "YOUR_PROJECT_ID", // Replace this
  chains: [mainnet, polygon, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
  ssr: true,
});

const endpoint = "https://api.mainnet-beta.solana.com";
const wallets = [new PhantomWalletAdapter()];

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
