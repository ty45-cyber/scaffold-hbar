import { HashConnect, HashConnectConnectionState } from "hashconnect";

export interface AppMetadata {
  name: string;
  description: string;
  icons: string[];
  url: string;
}

export class HashConnectManager {
  private hashconnect: HashConnect;

  constructor(appMetadata: AppMetadata) {
    this.hashconnect = new HashConnect(
      appMetadata as any,
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "scaffold-hbar-dev",
      "testnet",
      false
    );
  }

  public async pairWallet(): Promise<void> {
    await this.hashconnect.openPairingModal();
  }

  public getConnectionState(): HashConnectConnectionState {
    return this.hashconnect.connectionState;
  }

  public getSigner(accountId: string) {
    return this.hashconnect.getSigner(accountId as any);
  }
}
