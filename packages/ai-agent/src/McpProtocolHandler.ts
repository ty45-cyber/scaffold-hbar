export class McpProtocolHandler {
  private tools = new Map<string, Function>();

  public registerTool(name: string, handler: Function): void {
    this.tools.set(name, handler);
  }

  public async handleMessage(rawMessage: string): Promise<string> {
    const request = JSON.parse(rawMessage);
    const handler = this.tools.get(request.method);
    if (!handler) {
      return JSON.stringify({ jsonrpc: "2.0", id: request.id, error: { code: -32601, message: "Tool not found" } });
    }
    const result = await handler(request.params);
    return JSON.stringify({ jsonrpc: "2.0", id: request.id, result });
  }
}