import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

export class ScaffoldWriteEngine {
  public static useWrite() {
    const { writeContractAsync, data: hash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    const execute = async (contract: { address: `0x${string}`; abi: any }, fnName: string, args: any[] = [], value?: bigint) => {
      return await writeContractAsync({ address: contract.address, abi: contract.abi, functionName: fnName, args, value });
    };

    return { execute, isPending, isConfirming, isSuccess, hash };
  }
}