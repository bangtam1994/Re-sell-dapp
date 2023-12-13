import * as EventContract from "../contract/Event.json";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";

export function Buy({ eventAddress }: any) {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: eventAddress,
    abi: EventContract.abi,
    functionName: "buy",
    value: parseEther("0.1"),
  });

  return (
    <div>
      <button onClick={() => write()}>Buy</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
