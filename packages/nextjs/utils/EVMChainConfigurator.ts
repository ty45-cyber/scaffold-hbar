import { defineChain } from "viem";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export class EVMChainConfigurator {
  public static getHederaTestnet() {
    return defineChain({
      id: 296,
      name: "Hedera Testnet",
      nativeCurrency: { name: "HBAR", symbol: "HBAR", decimals: 18 },
      rpcUrls: { default: { http: ["https://testnet.hashio.io/api"] } },
      blockExplorers: { default: { name: "Hashscan", url: "https://hashscan.io/testnet" } },
    });
  }

  public static buildRainbowConfig(projectId: string) {
    return getDefaultConfig({
      appName: "Scaffold-HBAR",
      projectId,
      chains: [this.getHederaTestnet()],
      ssr: true,
    });
  }
}