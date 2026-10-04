import {
  DAppConnector,
  HederaJsonRpcMethod,
  HederaSessionEvent,
  HederaChainId,
} from "@hashgraph/hedera-wallet-connect";
import { LedgerId } from "@hashgraph/sdk";

export interface AppMetadata {
  name: string;
  description: string;
  icons: string[];
  url: string;
}

export class HashConnectManager {
  private connector: DAppConnector;

  constructor(appMetadata: AppMetadata) {
    this.connector = new DAppConnector(
      appMetadata,
      LedgerId.TESTNET,
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "scaffold-hbar-dev",
      Object.values(HederaJsonRpcMethod),
      [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
      [HederaChainId.Testnet]
    );
  }

  public async init(): Promise<void> {
    await this.connector.init({ logger: "error" });
  }

  public async pairWallet(): Promise<void> {
    await this.connector.openModal();
  }

  public getSigner(accountId: string) {
    return this.connector.getSigner(accountId as any);
  }

  public disconnect(): Promise<void> {
    return this.connector.disconnectAll();
  }
}
