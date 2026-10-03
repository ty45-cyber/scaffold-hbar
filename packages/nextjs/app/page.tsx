import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-2">🏗️ Scaffold-HBAR</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        The Open-Source Full-Stack Developer Engine for Hedera Hashgraph
      </p>
      <div className="flex gap-4">
        <Link
          href="/agent"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors"
        >
          🤖 AI Agent Playground
        </Link>
        <Link
          href="/debug"
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors"
        >
          🛠️ Contract Debugger
        </Link>
      </div>
    </main>
  );
}
