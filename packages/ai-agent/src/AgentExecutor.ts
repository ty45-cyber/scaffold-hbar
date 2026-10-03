import { HederaAgentKit } from "@hashgraph/hedera-agent-kit";

export class AgentExecutor {
  private agentKit: HederaAgentKit | null = null;

  public initialize(accountId: string, privateKey: string, network: "testnet" | "mainnet" = "testnet"): void {
    this.agentKit = new HederaAgentKit(accountId, privateKey, { network });
  }

  public async executePrompt(userPrompt: string): Promise<string> {
    if (!this.agentKit) {
      throw new Error("AgentExecutor not initialized with Hedera credentials.");
    }
    const cleanPrompt = userPrompt.replace(/[<>]/g, "").trim();
    // v4: use processMessage for natural language execution
    const result = await (this.agentKit as any).processMessage?.(cleanPrompt)
      ?? await (this.agentKit as any).run?.(cleanPrompt)
      ?? "Agent kit method not available in this version.";
    return typeof result === "string" ? result : JSON.stringify(result);
  }
}
