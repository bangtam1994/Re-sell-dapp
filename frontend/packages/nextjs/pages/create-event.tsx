import { FormEvent, useState } from "react";
import { Button } from "~~/components/Button";

type FormData = {
  eventName: undefined | string;
  eventDate: undefined | Date;
  ticketPrice: undefined | number;
  ticketQuantity: undefined | number;
  artistName: undefined | string;
  artistAddress: undefined | string;
};

const CreateEvent = () => {
  const [formData, setFormData] = useState<FormData>({
    eventName: undefined,
    eventDate: undefined,
    ticketPrice: undefined,
    ticketQuantity: undefined,
    artistName: undefined,
    artistAddress: undefined,
  });

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.eventName ||
      !formData.eventDate ||
      !formData.ticketPrice ||
      !formData.ticketQuantity ||
      !formData.artistName ||
      !formData.artistAddress
    )
      return;

    console.log(formData);
    // deploy contract
    // POST to DB

    setFormData({
      eventName: undefined,
      eventDate: undefined,
      ticketPrice: undefined,
      ticketQuantity: undefined,
      artistName: undefined,
      artistAddress: undefined,
    });
  };
  return (
    <div className="select-none text-center md:mx-10 lg:mx-16 xl:mx-48 2xl:mx-96 mt-10">
      <h1 className="font-orbitron">Create Event</h1>
      <form onSubmit={submitHandler} className="flex flex-col items-center gap-2 my-8">
        <div className="flex flex-col gap-2 w-[80%]">
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
          <input
            onChange={inputHandler}
            className="input text-gray-400"
            name="artistName"
            type="text"
            placeholder="Artist Name"
          />
          <input
            onChange={inputHandler}
            className="input text-gray-400"
            name="artistAddress"
            type="text"
            placeholder="Artist Wallet Address"
          />
        </div>
        <Button full>Create</Button>
      </form>
    </div>
  );
};

export default CreateEvent;
