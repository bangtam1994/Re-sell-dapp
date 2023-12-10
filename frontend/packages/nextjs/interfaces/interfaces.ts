export interface Ticket {
  nft_address: string;
  owner_address: string;
  onSale: boolean;
  price: number;
  date: string; // date of mint ?
}

export type Event = {
  id: string;
  name: string;
  artist: string;
  artistAddress: string;
  date: string; // todo
  price: number | null;
  ticketsBooked: number;
  totalTickets: number;
  attending: boolean;
  thumbnail: string;
};
