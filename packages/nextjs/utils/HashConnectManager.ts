import { HashConnect, HashConnectTypes } from "hashconnect";

export class HashConnectManager {
  private hashconnect: HashConnect;

  constructor(appMetadata: HashConnectTypes.AppMetadata) {
    this.hashconnect = new HashConnect();
    this.hashconnect.init(appMetadata, "testnet", false);
  }

  public async pairWallet(): Promise<HashConnectTypes.SessionData | null> {
    const pairingData = await this.hashconnect.connectToLocalWallet();
    return pairingData || null;
  }

  public getSigner(topic: string, accountId: string) {
    const provider = this.hashconnect.getProvider("testnet", topic, accountId);
    return this.hashconnect.getSigner(provider);
  }
}