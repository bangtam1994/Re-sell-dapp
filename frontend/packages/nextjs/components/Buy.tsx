import { useState } from "react";
import { useRouter } from "next/router";
import * as EventContract from "../contract/Event.json";
import { Button } from "./Button";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { useAccount } from "wagmi";
import { Event, Ticket } from "~~/interfaces/interfaces";
import { backendUrl } from "~~/pages/_app";

interface BuyProps {
  event: Event;
}

export function Buy({ event }: BuyProps) {
  const { address } = useAccount();
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<Partial<Ticket>>({
    ticket_address: "",
    owner_address: address,
    onSale: false,
    price: event.price,
    date: Math.round(new Date().getTime()).toString(),
  });
  const ticketLeft = event.totalTickets - event.ticketsBooked;

  const { data, isLoading, writeAsync } = useContractWrite({
    address: event.id,
    abi: EventContract.abi,
    functionName: "buy",
    value: parseEther(event.price.toString()),
  });

  const onSubmit = async () => {
    const response = await writeAsync();

    if (response.hash) {
      try {
        let request;

        // IF TICKET LEFTS : minting so calling create-ticket
        if (ticketLeft !== 0) {
          const payload = { ...formData, ticket_address: (event.ticketList.length + 1).toString() };

          request = {
            url: `${backendUrl}/${event.id}/ticket`,
            options: {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            },
          };
        } else {
          // IF no tickets left : transfer ownership so update-tickets
          request = {
            url: `${backendUrl}/${event.id}/update-ticket`,
            options: {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            },
          };
        }

        const response = await fetch(request.url, request.options);
        if (response.status === 200) {
          router.reload();
        } else {
          setError("An error occurred, please retry");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <span className="font-light mb-10">You don't have any tickets yet</span>
      {error ? (
        <span>{error}</span>
      ) : (
        <>
          <Button onClick={onSubmit}>Buy</Button>
          {isLoading && <div>Check Wallet</div>}
        </>
      )}
    </div>
  );
}
