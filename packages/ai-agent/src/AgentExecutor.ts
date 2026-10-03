import { HederaAgentAPI } from "@hashgraph/hedera-agent-kit";

export class AgentExecutor {
  private agentKit: HederaAgentAPI | null = null;

  public initialize(accountId: string, privateKey: string, network: "testnet" | "mainnet" = "testnet"): void {
    this.agentKit = new HederaAgentAPI(accountId, privateKey, { network });
  }

  public async executePrompt(userPrompt: string): Promise<string> {
    if (!this.agentKit) {
      throw new Error("AgentExecutor not initialized with Hedera credentials.");
    }
    const cleanPrompt = userPrompt.replace(/[<>]/g, "").trim();
    const result = await (this.agentKit as any).processMessage?.(cleanPrompt)
      ?? await (this.agentKit as any).run?.(cleanPrompt)
      ?? "Agent kit method not available in this version.";
    return typeof result === "string" ? result : JSON.stringify(result);
  }
}
