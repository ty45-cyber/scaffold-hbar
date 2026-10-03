import React, { useState } from "react";
import { ScaffoldWriteEngine } from "../hooks/useScaffoldWriteContract";

export class DebuggerRenderer {
  public static renderInputs(inputs: any[], formState: Record<string, any>, setForm: Function) {
    return inputs.map((inp) => (
      <input
        key={inp.name}
        placeholder={`${inp.name} (${inp.type})`}
        value={formState[inp.name] || ""}
        onChange={(e) => setForm({ ...formState, [inp.name]: e.target.value })}
        className="w-full p-2 my-1 border rounded text-sm text-black"
      />
    ));
  }

  public static renderCard(name: string, contract: { address: string; abi: any[] }) {
    const { execute, isPending } = ScaffoldWriteEngine.useWrite();
    const [inputs, setInputs] = useState<Record<string, any>>({});

    return (
      <div className="p-4 border rounded-lg bg-white text-black shadow-sm mb-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-xs font-mono text-gray-500 mb-2">{contract.address}</p>
        {contract.abi.filter((item) => item.type === "function").map((fn) => (
          <div key={fn.name} className="my-2 p-2 bg-gray-50 rounded">
            <span className="font-semibold text-sm">{fn.name}</span>
            {DebuggerRenderer.renderInputs(fn.inputs || [], inputs, setInputs)}
            <button
              onClick={() => execute(contract as any, fn.name, Object.values(inputs))}
              disabled={isPending}
              className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
            >
              {isPending ? "Executing..." : "Send Transaction"}
            </button>
          </div>
        ))}
      </div>
    );
  }
}