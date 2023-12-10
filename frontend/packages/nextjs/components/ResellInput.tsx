import React, { ChangeEvent, FormEvent, useState } from "react";
import { Ticket } from "../interfaces/interfaces";
import { useAccount } from "wagmi";
import { Button } from "~~/components/Button";

interface ResellProps {
  mytickets: Ticket[];
}

type FormData = {
  nft_address: undefined | string;
  ticketPrice: undefined | number;
  owner_address: undefined | string;
};

export const ResellInput = ({ mytickets }: ResellProps) => {
  const { address } = useAccount();

  const [formData, setFormData] = useState<FormData>({
    nft_address: "",
    ticketPrice: undefined,
    owner_address: address,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.nft_address || !formData.owner_address || !formData.ticketPrice) return;

    console.log(formData);
    // transfer function
    // POST to DB

    setFormData({
      nft_address: undefined,
      ticketPrice: undefined,
      owner_address: address,
    });
  };

  return (
    <div>
      <h3 className="text-xl md:text-1xl font-jura  underline underline-offset-8 my-10">RESELL </h3>

      <form onSubmit={onSubmit} className="flex justify-between  gap-2 my-8 ">
        <div>
          {" "}
          <input
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, ticketPrice: Number(event.target.value) });
            }}
            className="p-2 text-gray-900
          w-30"
            title="Price"
            placeholder="Enter your price"
          ></input>
          <span className="ml-2">ETH</span>
        </div>
        <select
          className="p-2 text-gray-900 "
          value={formData.nft_address}
          defaultValue={undefined}
          placeholder="Select your NFT"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData({ ...formData, nft_address: e.target.value });
          }}
        >
          {mytickets.map(ticket => (
            <option key={ticket.nft_address} value={ticket.nft_address}>
              {ticket.nft_address}
            </option>
          ))}
        </select>
        <Button>Submit</Button>
      </form>
    </div>
  );
};
