# 🏗️ Scaffold-HBAR

> **The Open-Source Full-Stack Developer Engine & AI Boilerplate for Hedera Hashgraph**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hedera Testnet](https://img.shields.io/badge/Hedera-Testnet%20(Chain%20296)-purple.svg)](https://hashscan.io/testnet)
[![Next.js 15](https://img.shields.io/badge/Next.js-15%20App%20Router-black.svg)](https://nextjs.org/)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-red.svg)](https://turbo.build/)
[![npm](https://img.shields.io/badge/npm-create--scaffold--hbar%400.1.1-red.svg)](https://www.npmjs.com/package/create-scaffold-hbar)

Scaffold-HBAR is an open-source tool built to lower the time-to-first-transaction (TTFT) on Hedera Hashgraph to **under 60 seconds**. It combines EVM-equivalent smart contract workflows (HSCS via Hashio JSON-RPC) with native Hedera Token (HTS) and Consensus (HCS) services, powered by an out-of-the-box **Hedera AI Agent Kit** integration.

---

## ✨ Features

- ⚡ **60-Second Setup (`npx create-scaffold-hbar@0.1.1`):** Single-command CLI bootstrapper with automated input sanitization and CSPRNG private key generation.
- 🔄 **Dual-Engine Architecture:**
  - **HSCS EVM Mode:** Hardhat setup connected to Hashio JSON-RPC Relay (`https://testnet.hashio.io/api`, Chain ID `296`).
  - **Native Hedera Mode:** Custom React hooks (`HederaTokenEngine`, `HederaConsensusEngine`) leveraging `@hiero-ledger/sdk` and `@hashgraph/hedera-wallet-connect`.
- 🛠️ **Automated ABI-to-UI Parser:** Running `yarn deploy` compiles Solidity contracts, registers deployed addresses, and generates strongly-typed TypeScript ABIs (`deployedContracts.ts`) to drive a zero-code **Contract Debugger UI**.
- 🤖 **AI-Native Wedge (MCP & Hedera Agent Kit):**
  - Interactive **AI Agent Playground UI** (`/agent`) powered by `@hashgraph/hedera-agent-kit`.
  - Built-in **Model Context Protocol (MCP)** server for IDE integration.
  - Pre-loaded **Cursor AI Rules** (`.cursor/rules/hedera.mdc`) providing natural language context for LLM coding assistants.
- 💼 **Multi-Wallet Support:** RainbowKit/Viem (MetaMask) and `@hashgraph/hedera-wallet-connect` (HashPack, Blade Wallet).

---

## 🚀 Quickstart

### Prerequisites

- Node.js `>=18.0.0`
- Yarn `>=1.22.0`
- Git

### 1. Bootstrap a New Project

```bash
npx create-scaffold-hbar@0.1.1 my-hbar-dapp
cd my-hbar-dapp
```

### 2. Set Environment Variables

Copy and fill in your credentials:

```bash
# packages/hardhat/.env
HEDERA_TESTNET_PRIVATE_KEY=0x<your_private_key>
NEXT_PUBLIC_HEDERA_ACCOUNT_ID=0.0.<your_account_id>
NEXT_PUBLIC_HEDERA_NETWORK=testnet
NEXT_PUBLIC_HASHIO_RPC_URL=https://testnet.hashio.io/api

# packages/nextjs/.env.local
NEXT_PUBLIC_HEDERA_ACCOUNT_ID=0.0.<your_account_id>
NEXT_PUBLIC_HEDERA_PRIVATE_KEY=0x<your_private_key>
NEXT_PUBLIC_HEDERA_NETWORK=testnet
NEXT_PUBLIC_HASHIO_RPC_URL=https://testnet.hashio.io/api
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your_walletconnect_project_id>
```

### 3. Install & Start

```bash
yarn install
yarn dev
```

Boots the Next.js frontend at `http://localhost:3000`.

### 4. Deploy Smart Contracts to Hedera Testnet

```bash
cd packages/hardhat
npm install
npx hardhat compile
npx hardhat run scripts/deploy.ts --network hederaTestnet
```

This deploys your contracts and auto-generates `packages/nextjs/utils/deployedContracts.ts` to power the Contract Debugger UI.

---

## 📦 Monorepo Architecture

```text
scaffold-hbar/
├── packages/
│   ├── cli/             # create-scaffold-hbar CLI (published to npm)
│   ├── hardhat/         # Hardhat contract environment & deploy scripts
│   ├── nextjs/          # Next.js 15 App Router dApp & Contract Debugger UI
│   └── ai-agent/        # Hedera Agent Kit & MCP Server implementation
├── turbo.json           # Turborepo task pipeline
└── package.json         # Root workspace scripts
```

---

## 📜 Deployed Contracts

| Contract | Network | Address | Explorer |
|---|---|---|---|
| `ScaffoldHBAR` | Hedera Testnet (Chain 296) | `0x41Db632021ED879189fb77dd4d1f7B3B1868B598` | [Hashscan](https://hashscan.io/testnet/contract/0x41Db632021ED879189fb77dd4d1f7B3B1868B598) |

---

## 📦 Published Packages

| Package | Version | Registry |
|---|---|---|
| `create-scaffold-hbar` | `0.1.1` | [npmjs.com](https://www.npmjs.com/package/create-scaffold-hbar) |

---

## 🔑 Account Info

| Field | Value |
|---|---|
| Hedera Account ID | `0.0.10857853` |
| EVM Address | `0xbDfadc146Da1EBF5a06780AEc034534Fb6CE8f0C` |
| Network | Testnet |
