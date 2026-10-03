import { useReadContract } from "wagmi";

export class ScaffoldReadEngine {
  public static createConfig(contract: { address: `0x${string}`; abi: any }, fnName: string, args: any[]) {
    return { address: contract?.address, abi: contract?.abi, functionName: fnName, args };
  }

  public static useRead(contract: { address: `0x${string}`; abi: any }, fnName: string, args: any[] = []) {
    const config = ScaffoldReadEngine.createConfig(contract, fnName, args);
    return useReadContract(config);
  }
}