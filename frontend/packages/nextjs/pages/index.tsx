import Image from "next/image";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Button } from "~~/components/Button";
import { Divider } from "~~/components/Divider";
import { EventLink } from "~~/components/Event";
import { MetaHeader } from "~~/components/MetaHeader";

const YOUR_ADDRESS = "0xBAF5cdEAD710e3347Dc3862E38a4044EAc50A036";

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
};

const dummyData: Event[] = [
  {
    id: "1231351234123",
    name: "The Event Equation",
    artist: "Justin Bieber",
    artistAddress: "dummyAddress1",
    date: "2023-12-28",
    price: null,
    ticketsBooked: 1232,
    totalTickets: 4000,
    attending: false,
  },
  {
    id: "456782456724",
    name: "Grand Gatherings",
    artist: "Tailor Swift",
    artistAddress: "dummyAddress2",
    date: "2023-12-28",
    price: null,
    ticketsBooked: 4000,
    totalTickets: 4000,
    attending: true,
  },
  {
    id: "0579838756245",
    name: "Sparkle Soirees",
    artist: "Justin Bieber",
    artistAddress: "dummyAddress1",
    date: "2023-12-28",
    price: null,
    ticketsBooked: 1232,
    totalTickets: 4000,
    attending: false,
  },
  {
    id: "656398456723567",
    name: "Vibrant Visions",
    artist: "Justin Bieber",
    artistAddress: "dummyAddress1",
    date: "2023-12-28",
    price: null,
    ticketsBooked: 3999,
    totalTickets: 4000,
    attending: false,
  },
  {
    id: "1235123351256",
    name: "Dreamy Destinations",
    artist: "Me",
    artistAddress: YOUR_ADDRESS,
    date: "2023-12-28",
    price: null,
    ticketsBooked: 6,
    totalTickets: 20,
    attending: false,
  },
];

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  // todo: hook for data fetching

  const myEvents = dummyData.filter(event => event.artistAddress === address);
  const eventsAttending = dummyData.filter(event => event.attending);
  const remainingEvents = dummyData.filter(event => event.artistAddress !== address && !event.attending);

  return (
    <div className="relative">
      <MetaHeader />
      {!isDisconnected && (
        <div className="text-center z-40 mt-3 sm:absolute sm:right-6 sm:top-6">
          <Button full link={"/create-event"}>
            Create Event
          </Button>
        </div>
      )}
      {isDisconnected ? (
        <div className="select-none text-center md:flex md:text-left md:justify-between md:mx-10 lg:mx-16 xl:mx-48 2xl:mx-60 mt-10">
          <div className="flex flex-col tracking-wide">
            <p className="font-orbitron text-4xl md:text-7xl font-medium m-0">ALLOW NFTS TO</p>
            <p className="font-orbitron text-4xl md:text-7xl font-medium m-0">SOLVE YOUR</p>
            <p className="font-orbitron text-4xl md:text-7xl font-medium m-0">RESALE</p>
            <p className="font-orbitron text-4xl md:text-7xl font-medium m-0">PROBLEM</p>
            <p className="font-orbitron text-2xl md:text-2xl my-8 tracking-widest">
              Create your event without limitations
            </p>
          </div>
          <div className="hidden md:block relative">
            <Image className="absolute rotate-45 right-10" src={"/git_2.gif"} alt="gif2" width={135} height={135} />
            <Image className="mt-20" src={"/git_1.gif"} alt="gif1" width={300} height={300} />
          </div>
        </div>
      ) : (
        <div className="relative mx-4 md:mx-10 lg:mx-16 xl:mx-48 2xl:mx-80 mt-10">
          <p className="text-center font-orbitron text-4xl md:text-3xl font-medium m-0">EXISTING EVENTS</p>
          <Divider>EVENTS I CREATED</Divider>
          {myEvents && (
            <ul>
              {myEvents.map(event => (
                <EventLink event={event} />
              ))}
            </ul>
          )}
          <Divider>EVENTS I AM ATTENDING</Divider>
          {eventsAttending && (
            <ul>
              {eventsAttending.map(event => (
                <EventLink event={event} />
              ))}
            </ul>
          )}
          <Divider>ALL OTHER EVENTS</Divider>
          {remainingEvents && (
            <ul>
              {remainingEvents.map(event => (
                <EventLink event={event} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
