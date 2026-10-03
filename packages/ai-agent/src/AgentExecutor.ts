import { HederaAgentAPI } from "@hashgraph/hedera-agent-kit";
import { Client, PrivateKey } from "@hiero-ledger/sdk";

export class AgentExecutor {
  private agentKit: HederaAgentAPI | null = null;

  public initialize(accountId: string, privateKey: string, network: "testnet" | "mainnet" = "testnet"): void {
    const client = network === "mainnet" ? Client.forMainnet() : Client.forTestnet();
    client.setOperator(accountId, PrivateKey.fromStringECDSA(privateKey));
    this.agentKit = new HederaAgentAPI(client);
  }

  public listTools(): { method: string; name: string; description: string }[] {
    if (!this.agentKit) return [];
    return this.agentKit.listTools();
  }

  public async executePrompt(method: string, args: unknown = {}): Promise<string> {
    if (!this.agentKit) {
      throw new Error("AgentExecutor not initialized with Hedera credentials.");
    }
    return await this.agentKit.run(method, args);
  }
}
