"use client";
import React, { useState, useEffect } from "react";
import { AgentExecutor } from "../../../ai-agent/src/AgentExecutor";

const executor = new AgentExecutor();

export default function AgentPlayground() {
  const [tools, setTools] = useState<{ method: string; name: string; description: string }[]>([]);
  const [method, setMethod] = useState("");
  const [args, setArgs] = useState("{}");
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const accountId = process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID;
    const privateKey = process.env.NEXT_PUBLIC_HEDERA_PRIVATE_KEY;
    if (accountId && privateKey) {
      try {
        executor.initialize(accountId, privateKey);
        setTools(executor.listTools());
        setInitialized(true);
      } catch (e: any) {
        setError(e.message);
      }
    } else {
      setError("Missing NEXT_PUBLIC_HEDERA_ACCOUNT_ID or NEXT_PUBLIC_HEDERA_PRIVATE_KEY env vars.");
    }
  }, []);

  const handleRun = async () => {
    if (!method) return;
    let parsedArgs: unknown;
    try {
      parsedArgs = JSON.parse(args);
    } catch {
      setLogs((prev) => [...prev, `> Error: Invalid JSON in args`]);
      return;
    }
    setLoading(true);
    setLogs((prev) => [...prev, `> Calling: ${method}(${args})`]);
    try {
      const result = await executor.executePrompt(method, parsedArgs);
      setLogs((prev) => [...prev, `> Result: ${result}`]);
    } catch (err: any) {
      setLogs((prev) => [...prev, `> Error: ${err.message}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-lg my-8">
      <h2 className="text-xl font-bold mb-1">🤖 Hedera AI Agent Playground</h2>
      <p className="text-xs text-gray-400 mb-4">Dispatch HTS, HCS, and HSCS tool calls on Testnet.</p>

      {error && <p className="text-red-400 text-xs mb-4 bg-red-900/30 p-2 rounded">{error}</p>}

      {initialized && (
        <div className="mb-4">
          <label className="text-xs text-gray-400 block mb-1">Select Tool</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 text-sm rounded border border-slate-700 text-white"
          >
            <option value="">-- choose a tool --</option>
            {tools.map((t) => (
              <option key={t.method} value={t.method} title={t.description}>
                {t.name} ({t.method})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="text-xs text-gray-400 block mb-1">Args (JSON)</label>
        <textarea
          value={args}
          onChange={(e) => setArgs(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-slate-800 text-sm rounded border border-slate-700 text-white font-mono focus:outline-none"
        />
      </div>

      <div className="bg-black/50 p-4 rounded-lg h-48 overflow-y-auto font-mono text-xs mb-4 border border-slate-800">
        {logs.length === 0 && <span className="text-gray-600">Output will appear here...</span>}
        {logs.map((log, idx) => <div key={idx} className="mb-1">{log}</div>)}
      </div>

      <button
        onClick={handleRun}
        disabled={loading || !initialized || !method}
        className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-semibold disabled:opacity-50"
      >
        {loading ? "Executing..." : "Execute Tool"}
      </button>
    </div>
  );
}
