import React, { FormEvent, useState } from "react";
import * as EventContract from "../contract/Event.json";
import { Ticket } from "../interfaces/interfaces";
import { useAccount, useContractWrite } from "wagmi";
import { Button } from "~~/components/Button";
import { backendUrl } from "~~/pages/_app";

interface ResellProps {
  mytickets: Ticket[];
  eventAddress: string;
}

export const ResellInput = ({ mytickets, eventAddress }: ResellProps) => {
  const [formData, setFormData] = useState<Partial<Ticket> | undefined>({ ticket_address: "" });
  const [message, setMessage] = useState<{ success: boolean | undefined; text: string }>({
    success: undefined,
    text: "",
  });

  const { writeAsync } = useContractWrite({
    address: eventAddress,
    abi: EventContract.abi,
    functionName: "listForSale",
    args: [Number(formData?.ticket_address)],
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    if (!formData || !formData.ticket_address || !formData.owner_address) return;

    const responseWrite = await writeAsync(); // list function

    if (responseWrite.hash) {
      // POST to DB
      try {
        const payload = {
          ...formData,
          onSale: true,
        };

        const response = await fetch(`${backendUrl}/${eventAddress}/update-ticket`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.status === 200) {
          setMessage({ success: true, text: "Your ticket has been successfully put into the market for resale" });
        } else setMessage({ success: false, text: "An error occurred, please retry" });
      } catch (error) {
        console.log(error);
        setMessage({ success: false, text: "An error occurred, please retry" });
      }
    }
  };

  return (
    <div>
      <h3 className="text-xl md:text-1xl font-jura  underline underline-offset-8 my-10">RESELL </h3>
      {message.success === undefined ? (
        <form onSubmit={onSubmit} className="flex items-center gap-10 my-8 h-[100%]">
          <select
            className="p-2 text-gray-900"
            value={formData?.ticket_address}
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const selectedTicket = mytickets.find(ticket => ticket.ticket_address === e.target.value);
              setFormData({ ...formData, ...selectedTicket });
            }}
          >
            <option disabled={true} value="">
              Select your ticket
            </option>
            {mytickets.map(ticket => (
              <option key={ticket.ticket_address} value={ticket.ticket_address}>
                {ticket.ticket_address}
              </option>
            ))}
          </select>
          <Button>Submit</Button>
        </form>
      ) : (
        <span>{message.text}</span>
      )}
    </div>
  );
};
