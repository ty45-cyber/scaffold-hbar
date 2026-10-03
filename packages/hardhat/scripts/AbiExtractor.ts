import fs from "fs";

export class AbiExtractor {
  public readArtifact(artifactPath: string): object {
    const rawData = fs.readFileSync(artifactPath, "utf-8");
    return JSON.parse(rawData);
  }

  public formatContractEntry(name: string, address: string, abi: object[]): string {
    return JSON.stringify({ [name]: { address, abi } }, null, 2);
  }
}