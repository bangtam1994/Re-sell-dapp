import { Event, EventRaw } from "~~/interfaces/interfaces";

export const convertToEvent = (event: EventRaw): Event => {
  const { _id, name, artistAddress, artistName, eventDate, price, quantity, ticketList } = event;
  return {
    id: _id,
    name,
    artistName,
    artistAddress,
    eventDate,
    price,
    totalTickets: quantity,
    ticketsBooked: ticketList.length,
    thumbnail: `event_${Math.floor(Math.random() * 3) + 1}`,
  };
};
