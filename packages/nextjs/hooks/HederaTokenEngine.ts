import { TokenCreateTransaction, TokenMintTransaction, Client, Signer } from "@hashgraph/sdk";

export class HederaTokenEngine {
  public static async createToken(signer: Signer, name: string, symbol: string): Promise<string> {
    const tx = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTreasuryAccountId(signer.getAccountId())
      .freezeWithSigner(signer);
      
    const executedTx = await tx.executeWithSigner(signer);
    const receipt = await executedTx.getReceiptWithSigner(signer);
    return receipt.tokenId!.toString();
  }

  public static async mintToken(signer: Signer, tokenId: string, amount: number): Promise<boolean> {
    const tx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setAmount(amount)
      .freezeWithSigner(signer);
      
    const executedTx = await tx.executeWithSigner(signer);
    const receipt = await executedTx.getReceiptWithSigner(signer);
    return receipt.status.toString() === "SUCCESS";
  }
}