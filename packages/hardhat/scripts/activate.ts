import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Activating EVM alias for:", signer.address);

  // Send 0-value transfer to self to activate the account alias on Hedera
  const tx = await signer.sendTransaction({
    to: signer.address,
    value: ethers.parseEther("0"),
    gasLimit: 100000,
  });

  await tx.wait();
  console.log("Account activated. Tx hash:", tx.hash);
}

main().catch((err) => { console.error(err); process.exit(1); });
