import { FormEvent, useState } from "react";
import * as EventContract from "./../contract/Ticket.json";
import { createPublicClient, createWalletClient, custom, getContractAddress, http } from "viem";
import { useAccount, useNetwork } from "wagmi";
import { Button } from "~~/components/Button";

type FormData = {
  eventName: undefined | string;
  eventDate: undefined | Date;
  ticketPrice: undefined | number;
  ticketQuantity: undefined | number;
  artistName: undefined | string;
  royalty: undefined | number;
};

const CreateEvent = () => {
  const { isDisconnected, address } = useAccount();
  const { chain } = useNetwork();

  const [formData, setFormData] = useState<FormData>({
    eventName: undefined,
    eventDate: undefined,
    ticketPrice: undefined,
    ticketQuantity: undefined,
    artistName: undefined,
    royalty: undefined,
  });

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.eventName ||
      !formData.eventDate ||
      !formData.ticketPrice ||
      !formData.ticketQuantity ||
      !formData.artistName ||
      !formData.royalty
    )
      return;

    const eventDataAsUnixTimestamp = Math.round(new Date(formData.eventDate).getTime());

    console.log(formData);

    const walletClient = createWalletClient({
      chain: chain,
      transport: custom(window.ethereum),
    });

    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });

    if (!address) throw new Error("No address available");

    const hash = await walletClient.deployContract({
      abi: EventContract.abi,
      account: address,
      args: [
        formData.eventName,
        eventDataAsUnixTimestamp,
        formData.ticketPrice,
        formData.ticketQuantity,
        formData.artistName,
        formData.royalty,
      ],
      bytecode: EventContract.bytecode as `0x${string}`,
    });

    const transactionCount = await publicClient.getTransactionCount({
      address,
    });
    const contractAddress = getContractAddress({
      from: address,
      nonce: BigInt(transactionCount),
    });

    console.log(contractAddress);

    // POST to DB
    fetch("");

    setFormData({
      eventName: undefined,
      eventDate: undefined,
      ticketPrice: undefined,
      ticketQuantity: undefined,
      artistName: undefined,
      royalty: undefined,
    });
  };
  return (
    <div className="select-none text-center md:mx-10 lg:mx-16 xl:mx-48 2xl:mx-96 mt-10">
      {isDisconnected ? (
        <p className="text-lg">Please connect to a wallet!</p>
      ) : (
        <>
          <h1 className="font-orbitron">Create Event</h1>
          <form onSubmit={submitHandler} className="flex flex-col items-center gap-2 my-8">
            <div className="flex flex-col gap-2 w-[80%]">
              <input
                onChange={inputHandler}
                className="input text-gray-400"
                name="artistName"
                type="text"
                placeholder="Artist Name"
              />
              <input
                required
                onChange={inputHandler}
                className="input text-gray-400"
                name="eventName"
                type="text"
                placeholder="Event Name"
              />
              <input
                onChange={inputHandler}
                className="input text-gray-400"
                name="eventDate"
                type="date"
                placeholder="Event Date"
              />
              <input
                onChange={inputHandler}
                className="input text-gray-400"
                name="ticketPrice"
                type="number"
                placeholder="Ticket Price"
              />
              <input
                onChange={inputHandler}
                className="input text-gray-400"
                name="ticketQuantity"
                type="number"
                placeholder="Ticket Quantity"
              />
              <div>
                <label htmlFor="royalty">Royalty {formData.royalty && `${formData.royalty}%`}</label>
                <div className="flex gap-5">
                  <span>0%</span>
                  <input
                    id="royalty"
                    name="royalty"
                    onChange={inputHandler}
                    type="range"
                    min={0}
                    max="50"
                    className="range range-primary"
                  />
                  <span>50%</span>
                </div>
              </div>
            </div>
            <Button full>Create</Button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateEvent;
