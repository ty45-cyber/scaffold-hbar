"use client";
import { DebuggerRenderer } from "../../components/ContractDebugger";

// Populated by `yarn deploy` via AbiFileWriter
const deployedContracts: Record<string, { address: string; abi: any[] }> = {};

export default function DebugPage() {
  const entries = Object.entries(deployedContracts);
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">🛠️ Contract Debugger</h1>
      {entries.length === 0 ? (
        <p className="text-gray-500">
          No contracts deployed yet. Run <code className="bg-gray-200 px-1 rounded">yarn deploy</code> to populate this UI.
        </p>
      ) : (
        entries.map(([name, contract]) => (
          <div key={name}>{DebuggerRenderer.renderCard(name, contract)}</div>
        ))
      )}
    </main>
  );
}
