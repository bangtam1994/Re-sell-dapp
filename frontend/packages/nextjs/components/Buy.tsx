import * as EventContract from "../contract/Event.json";
import { createWalletClient, custom } from "viem";
import { useContractWrite, useNetwork } from "wagmi";

export function Buy() {
  const { chain } = useNetwork();

  const walletClient = createWalletClient({
    chain: chain,
    transport: custom(window.ethereum),
  });

  const contractAddress = "0x28F18314FD694EA8f3FC87D7430313B0c32f6E53";

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress,
    abi: EventContract.abi,
    functionName: "buy",
  });

  return (
    <div>
      <button onClick={() => write()}>Buy</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
