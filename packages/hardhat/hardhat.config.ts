import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const HEDERA_TESTNET_KEY = process.env.HEDERA_TESTNET_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: "hederaTestnet",
  networks: {
    hederaTestnet: {
      url: "https://testnet.hashio.io/api",
      accounts: [HEDERA_TESTNET_KEY],
      chainId: 296,
    },
  },
};

export default config;