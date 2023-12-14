import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import * as EventContract from "./../contract/Event.json";
import { backendUrl } from "./_app";
import { createPublicClient, createWalletClient, custom, getContractAddress, http, parseEther } from "viem";
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
  const router = useRouter();

  const walletClient = createWalletClient({
    chain: chain,
    transport: custom(window.ethereum!),
  });

  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  });

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
    ) {
      alert("Missing informations in the form");
      return;
    }

    const eventDataAsUnixTimestamp = Math.round(new Date(formData.eventDate).getTime());

    try {
      if (!address) throw new Error("No address available");

      await walletClient.deployContract({
        abi: EventContract.abi,
        account: address,
        args: [
          formData.eventName,
          eventDataAsUnixTimestamp,
          parseEther(formData.ticketPrice.toString()),
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
      if (contractAddress) {
        console.log("contract has been deployed at address : ", contractAddress);

        const payload = {
          name: formData.eventName,
          contractAddress,
          artistAddress: address,
          artistName: formData.artistName,
          eventDate: eventDataAsUnixTimestamp.toString(),
          price: formData.ticketPrice,
          quantity: formData.ticketQuantity,
        };

        const response = await fetch(`${backendUrl}/create-event`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const resultApi = await response.json();
        if (resultApi.contractAddress) {
          router.push(`/event/${resultApi.contractAddress}`);
        } else throw new Error("An issue occured, the event wasn't submitted to backend");
      } else throw new Error("An issue occurred, the contract wasn't deployed successfully");
    } catch (error) {
      console.error("Error :", error);
    }
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
                className="input text-gray-800"
                name="artistName"
                type="text"
                placeholder="Artist Name"
              />
              <input
                required
                onChange={inputHandler}
                className="input text-gray-800"
                name="eventName"
                type="text"
                placeholder="Event Name"
              />
              <input
                onChange={inputHandler}
                className="input text-gray-800"
                name="eventDate"
                type="date"
                placeholder="Event Date"
              />
              <input
                onChange={inputHandler}
                className="input text-gray-800"
                name="ticketPrice"
                type="number"
                step="any"
                min="0"
                max="100"
                placeholder="Ticket Price"
              />
              <input
                onChange={inputHandler}
                className="input text-gray-800"
                name="ticketQuantity"
                type="number"
                placeholder="Ticket Quantity"
              />
              <div className="my-8">
                <label htmlFor="royalty">Royalty {formData.royalty && `${formData.royalty}%`}</label>
                <div className="flex gap-5 mt-8">
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
            <div>
              <Button full>Create</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateEvent;
