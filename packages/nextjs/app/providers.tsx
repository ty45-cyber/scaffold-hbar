"use client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EVMChainConfigurator } from "../utils/EVMChainConfigurator";
import "@rainbow-me/rainbowkit/styles.css";

const wagmiConfig = EVMChainConfigurator.buildRainbowConfig(
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "scaffold-hbar-dev"
);
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
