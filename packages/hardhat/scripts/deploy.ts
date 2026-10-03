import { ethers } from "hardhat";
import path from "path";
import { AbiExtractor } from "./AbiExtractor";
import { AbiFileWriter } from "./AbiFileWriter";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Contract = await ethers.getContractFactory("ScaffoldHBAR");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("ScaffoldHBAR deployed to:", address);

  const artifactPath = path.join(__dirname, "../artifacts/contracts/ScaffoldHBAR.sol/ScaffoldHBAR.json");
  const extractor = new AbiExtractor();
  const artifact = extractor.readArtifact(artifactPath) as any;
  const entry = extractor.formatContractEntry("ScaffoldHBAR", address, artifact.abi);

  const writer = new AbiFileWriter();
  const tsContent = writer.wrapAsTsModule(entry);
  const outputPath = path.join(__dirname, "../../nextjs/utils/deployedContracts.ts");
  writer.writeToNextjs(outputPath, tsContent);
  console.log("ABI written to nextjs/utils/deployedContracts.ts");
}

main().catch((err) => { console.error(err); process.exit(1); });
