import crypto from "crypto";
import fs from "fs";

export class EnvConfigurator {
  public generateRandomPrivateKey(): string {
    return "0x" + crypto.randomBytes(32).toString("hex");
  }

  public writeEnvFile(targetPath: string, key: string): void {
    const content = `HEDERA_TESTNET_PRIVATE_KEY=${key}\nNEXT_PUBLIC_HEDERA_NETWORK=testnet\n`;
    fs.writeFileSync(`${targetPath}/packages/hardhat/.env`, content);
    fs.writeFileSync(`${targetPath}/packages/nextjs/.env.local`, content);
  }
}