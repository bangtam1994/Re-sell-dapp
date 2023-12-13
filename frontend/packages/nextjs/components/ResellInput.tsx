import React, { FormEvent, useState } from "react";
import { Ticket } from "../interfaces/interfaces";
import { Button } from "~~/components/Button";
import { backendUrl } from "~~/pages/_app";

interface ResellProps {
  mytickets: Ticket[];
  eventAddress: string;
}

export const ResellInput = ({ mytickets, eventAddress }: ResellProps) => {
  const [formData, setFormData] = useState<Partial<Ticket> | undefined>({ ticket_address: "" });
  const [message, setMessage] = useState("");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    if (!formData || !formData.ticket_address || !formData.owner_address) return;

    // transfer function

    // POST to DB
    try {
      const payload = {
        ...formData,
        onSale: true,
      };
      console.log("payload>>", payload);
      const response = await fetch(`${backendUrl}/${eventAddress}/update-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(response);
      if (response.status === 200) setMessage("Your ticket has been successfully put into the market for resale");
      else setMessage("An error occurred");
    } catch (error) {
      console.log(error);
      setMessage("An error occurred");
    }
  };

  return (
    <div>
      <h3 className="text-xl md:text-1xl font-jura  underline underline-offset-8 my-10">RESELL </h3>

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
        {message && <span>{message}</span>}
      </form>
    </div>
  );
};
