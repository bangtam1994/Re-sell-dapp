import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Buy } from "../../components/Buy";
import { List } from "../../components/List";
import { ResellInput } from "../../components/ResellInput";
import { Ticket } from "../../interfaces/interfaces";
import dummyDataJson from "../dummyEvents.json";
import dummyNFTJson from "../dummyNFT.json";
import { Event as EventType } from "../index";
import { useAccount } from "wagmi";

const Event = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [eventData, setEventData] = useState<EventType>();
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);

  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

  const isAttending = eventData && eventData.attending;
  const canResell = eventData && eventData.totalTickets - eventData.ticketsBooked === 0; // only resell possible if all tickets are sold

  // todo: hook for data fetching GET - Event Data/:id

  const fetchEvents = async () => {
    setIsLoadingEvents(true);
    const dummyEvent = dummyDataJson.find((el: EventType) => el.id === router.query.eventId);
    if (dummyEvent) {
      setEventData(dummyEvent);
    }
    setIsLoadingEvents(false);
  };

  const fetchMyNFT = async () => {
    setIsLoadingTickets(true);
    const dummyNFTs = dummyNFTJson.filter((el: Ticket) => el.owner_address === address);
    if (dummyNFTs.length > 0) {
      setMyTickets(dummyNFTs);
    }
    setIsLoadingTickets(false);
  };

  useEffect(() => {
    fetchEvents();
    fetchMyNFT();
  }, []);

  return (
    <div className="relative mx-4 md:mx-10 lg:mx-16 xl:mx-48 2xl:mx-80 mt-10">
      <h1 className="text-center font-orbitron text-4xl md:text-3xl font-medium m-0">EVENT INFORMATION</h1>

      {isLoadingEvents ? (
        <span>Fetching data event ...</span>
      ) : (
        eventData && (
          <div className="flex my-20 justify-between gap-5">
            {/* LEFT SIDE */}

            <div className="flex-1 flex flex-col">
              <h2 className="text-3xl md:text-2xl font-jura mb-20 underline underline-offset-8">{eventData.name}</h2>
              <div className="flex gap-4 break-words">
                <div className="flex flex-col gap-8 ">
                  <span>Artist Name :</span>
                  <span>Date :</span>
                  <span>Ticket Price :</span>
                  <span>Ticket remaining :</span>
                  <span>Event contract address :</span>
                </div>
                <div className="flex flex-col gap-8 font-light">
                  <span>{eventData.artist} </span>
                  <span>{eventData.date} </span>
                  <span>{eventData.price ? `${eventData.price} ETH` : "N/A"} </span>
                  <span>{eventData.totalTickets - eventData.ticketsBooked} </span>
                  <span>{eventData.id}</span> {/* TO CHECK : id is contract address */}
                </div>
              </div>
            </div>
            {/* RIGHT SIDE */}
            <div className="flex-1 flex flex-col  justify-start ">
              <Image
                src={eventData.thumbnail}
                width={400}
                height={400}
                alt={eventData.id}
                style={{ margin: "0px auto" }}
              />
              <h3 className="text-xl md:text-1xl font-jura  underline underline-offset-8 my-10"> MY TICKET</h3>
              {!isAttending ? (
                <Buy />
              ) : (
                isAttending &&
                myTickets.length > 0 && (
                  <div>
                    <div className="flex gap-8">
                      {myTickets.map(ticket => (
                        <div
                          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                          key={ticket.nft_address}
                        >
                          <span className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                            NFT address : {ticket.nft_address}
                            <br />
                            Minted on : {ticket.date}
                          </span>
                        </div>
                      ))}{" "}
                    </div>

                    {canResell && <ResellInput mytickets={myTickets} />}
                  </div>
                )
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}
export default Event;
