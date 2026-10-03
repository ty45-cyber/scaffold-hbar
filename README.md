# 🏗️ Scaffold-HBAR

> **The Open-Source Full-Stack Developer Engine & AI Boilerplate for Hedera Hashgraph**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hedera Testnet](https://img.shields.io/badge/Hedera-Testnet%20(Chain%20296)-purple.svg)](https://hashscan.io/testnet)
[![Next.js 15](https://img.shields.io/badge/Next.js-15%20App%20Router-black.svg)](https://nextjs.org/)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-red.svg)](https://turbo.build/)

Scaffold-HBAR is an open-source tool built to lower the time-to-first-transaction (TTFT) on Hedera Hashgraph to **under 60 seconds**. It combines EVM-equivalent smart contract workflows (HSCS via Hashio JSON-RPC) with native Hedera Token (HTS) and Consensus (HCS) services, powered by an out-of-the-box **Hedera AI Agent Kit** integration.

---

## ✨ Features

- ⚡ **60-Second Setup (`npx create-scaffold-hbar`):** Single-command CLI bootstrapper with automated input sanitization and CSPRNG private key generation.
- 🔄 **Dual-Engine Architecture:**
  - **HSCS EVM Mode:** Hardhat setup connected to Hashio JSON-RPC Relay (`https://testnet.hashio.io/api`, Chain ID `296`).
  - **Native Hedera Mode:** Custom React hooks (`useHederaTokenEngine`, `useHederaConsensusEngine`) leveraging `@hashgraph/sdk` and `HashConnect`.
- 🛠️ **Automated ABI-to-UI Parser:** Running `yarn deploy` compiles Solidity contracts, registers deployed addresses, and generates strongly-typed TypeScript ABIs (`deployedContracts.ts`) to drive a zero-code **Contract Debugger UI**.
- 🤖 **AI-Native Wedge (MCP & Hedera Agent Kit):**
  - Interactive **AI Agent Playground UI** (`/agent`) powered by `@hedera/agent-kit`.
  - Built-in **Model Context Protocol (MCP)** server for IDE integration.
  - Pre-loaded **Cursor AI Rules** (`.cursor/rules/hedera.mdc`) providing natural language context for LLM coding assistants.
- 💼 **Multi-Wallet Support:** Built-in dual connection modals using RainbowKit/Viem (MetaMask) and HashConnect (HashPack, Blade Wallet).

---

## 📦 Monorepo Architecture

```text
scaffold-hbar/
├── packages/
│   ├── cli/             # `create-scaffold-hbar` execution engine
│   ├── hardhat/         # Hardhat contract environment & deploy scripts
│   ├── nextjs/          # Next.js 15 App Router dApp & Contract Debugger UI
│   └── ai-agent/        # Hedera Agent Kit & MCP Server implementation
├── .cursor/rules/       # Pre-configured AI rules for LLM coding assistants
├── turbo.json           # Turborepo task pipeline (DAG)
└── package.json         # Root workspace workspace scripts
Quickstart Guide
Prerequisites
Node.js >=18.0.0

Yarn >=1.22.0 or pnpm

Git

1. Bootstrap a New Project
Bash
npx create-scaffold-hbar my-hbar-dapp
cd my-hbar-dapp
2. Start the Local Development Environment
In the root directory, run:

Bash
yarn dev
This boots both the Next.js frontend at http://localhost:3000 and watches package changes via Turborepo.

3. Deploy Smart Contracts to Hedera Testnet
In a separate terminal window, deploy your Solidity contracts:

Bash
yarn deploy