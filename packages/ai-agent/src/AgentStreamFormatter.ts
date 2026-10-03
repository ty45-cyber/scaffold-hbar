export class AgentStreamFormatter {
  public static formatChunk(textChunk: string): string {
    return `data: ${JSON.stringify({ text: textChunk })}\n\n`;
  }

  public static parseToolCalls(rawResponse: any): Record<string, any>[] {
    if (!rawResponse || !rawResponse.tool_calls) return [];
    return rawResponse.tool_calls.map((tc: any) => ({ name: tc.name, args: tc.args }));
  }
}