import { Event, EventRaw } from "~~/interfaces/interfaces";

export const convertToEvent = (event: EventRaw): Event => {
  const { contractAddress, name, artistAddress, artistName, eventDate, price, quantity, ticketList } = event;
  return {
    id: contractAddress,
    name,
    artistName,
    artistAddress,
    eventDate,
    price,
    totalTickets: quantity,
    ticketsBooked: ticketList.length,
    thumbnail: `/event_${Math.floor(Math.random() * 3) + 1}.jpg`,
    ticketList,
  };
};
