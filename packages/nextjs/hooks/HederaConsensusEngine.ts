import { TopicMessageSubmitTransaction, TopicMessageQuery, Client, Signer } from "@hiero-ledger/sdk";

export class HederaConsensusEngine {
  public static async submitMessage(signer: Signer, topicId: string, message: string): Promise<string> {
    const tx = await new TopicMessageSubmitTransaction()
      .setTopicId(topicId)
      .setMessage(message)
      .freezeWithSigner(signer);

    const executedTx = await tx.executeWithSigner(signer);
    const receipt = await executedTx.getReceiptWithSigner(signer);
    return receipt.status.toString();
  }

  public static subscribeToTopic(client: Client, topicId: string, onMessage: (msg: string) => void): void {
    new TopicMessageQuery()
      .setTopicId(topicId)
      .subscribe(client, null, (message) => {
        onMessage(Buffer.from(message.contents).toString("utf-8"));
      });
  }
}