export interface Ticket {
  ticket_address: string;
  owner_address: string;
  onSale: boolean;
  price: number;
  date: string; // date of mint
}

export type Event = {
  id: string; // is the event contract_address
  name: string;
  artistName: string;
  artistAddress: string;
  eventDate: string;
  price: number;
  ticketsBooked: number;
  totalTickets: number;
  ticketList: Ticket[];
  thumbnail: string;
};

// this is the result from api, hence "raw"
export type EventRaw = {
  artistAddress: string;
  artistName: string;
  contractAddress: string;
  eventDate: string;
  name: string;
  price: number;
  quantity: number;
  ticketList: Ticket[];
  _id: string;
};
