"use client";
import React, { useState } from "react";
import { AgentExecutor } from "../../../ai-agent/src/AgentExecutor";

export default function AgentPlayground() {
  const [prompt, setPrompt] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!prompt) return;
    setLoading(true);
    setLogs((prev) => [...prev, `> User: ${prompt}`]);
    try {
      const executor = new AgentExecutor();
      executor.initialize(
        process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID || "0.0.12345",
        process.env.NEXT_PUBLIC_HEDERA_PRIVATE_KEY || "0x00"
      );
      const result = await executor.executePrompt(prompt);
      setLogs((prev) => [...prev, `> Agent: ${result}`]);
    } catch (err: any) {
      setLogs((prev) => [...prev, `> Error: ${err.message}`]);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-lg my-8">
      <h2 className="text-xl font-bold mb-2">🤖 Hedera AI Agent Playground</h2>
      <p className="text-xs text-gray-400 mb-4">Execute natural language HTS, HCS, and HSCS transactions on Testnet.</p>
      <div className="bg-black/50 p-4 rounded-lg h-64 overflow-y-auto font-mono text-xs mb-4 border border-slate-800">
        {logs.map((log, idx) => (
          <div key={idx} className="mb-1">{log}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Create an HTS token called BuilderCoin with 1000 supply"
          className="flex-1 px-3 py-2 bg-slate-800 text-sm rounded border border-slate-700 text-white focus:outline-none"
        />
        <button
          onClick={handleRun}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-semibold disabled:opacity-50"
        >
          {loading ? "Running..." : "Execute"}
        </button>
      </div>
    </div>
  );
}