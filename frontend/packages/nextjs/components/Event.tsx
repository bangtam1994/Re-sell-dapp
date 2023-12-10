import Link from "next/link";
import { Event } from "~~/pages";

type Props = {
  event: Event;
};

export const EventLink = ({ event }: Props) => {
  const remainingTickets = event.totalTickets - event.ticketsBooked;

  const getTicketCounter = (remainingTickets: number) => {
    switch (true) {
      case remainingTickets === 0:
        return <span className="text-red-500">Fully booked!</span>;

      case remainingTickets === 1:
        return <span className="text-red-500">Only 1 Ticket left!</span>;

      case remainingTickets < 15:
        return <span className="text-orange-400">Only {remainingTickets} Tickets left!</span>;

      default:
        return <span className="text-white">{remainingTickets} Tickets left</span>;
    }
  };

  return (
    <Link href={`/event/${event.id}`}>
      <li className="font-jura flex items-center rounded-md py-6 px-4 bg-[#b7bfbf] my-4 h-20 hover:opacity-80 active:scale-[99%] text-black">
        <div className="w-full grid grid-cols-5 justify-between center">
          <span>{event.name}</span>
          <span>{event.artist}</span>
          <span>
            {new Date(event.date).toLocaleDateString("en-EN", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>
            Tickets: {event.ticketsBooked}/{event.totalTickets}
          </span>
          {getTicketCounter(remainingTickets)}
        </div>
      </li>
    </Link>
  );
};
