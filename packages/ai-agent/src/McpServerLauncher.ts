import { McpProtocolHandler } from "./McpProtocolHandler";

export class McpServerLauncher {
  private handler: McpProtocolHandler;

  constructor(handler: McpProtocolHandler) {
    this.handler = handler;
  }

  public setupStdioTransport(): void {
    process.stdin.on("data", async (chunk) => {
      const response = await this.handler.handleMessage(chunk.toString());
      process.stdout.write(response + "\n");
    });
  }

  public start(): void {
    this.setupStdioTransport();
    console.error("[Scaffold-HBAR MCP Server] Listening on stdio...");
  }
}