import fs from "fs";

export class AbiFileWriter {
  public wrapAsTsModule(jsonContent: string): string {
    return `export const deployedContracts = ${jsonContent} as const;\n`;
  }

  public writeToNextjs(outputPath: string, tsContent: string): void {
    fs.writeFileSync(outputPath, tsContent, "utf-8");
  }
}