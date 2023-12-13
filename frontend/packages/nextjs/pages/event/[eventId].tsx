import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ResellInput } from "../../components/ResellInput";
import { Ticket } from "../../interfaces/interfaces";
import { backendUrl } from "../_app";
import dummyDataJson from "../dummyEvents.json";
import dummyNFTJson from "../dummyNFT.json";
import { useAccount } from "wagmi";
import { convertToEvent } from "~~/utils/convertToEvents";
import { Event } from "../../interfaces/interfaces";


const Event = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [eventData, setEventData] = useState<Event>();

  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  // todo: hook for data fetching GET - Event Data/:id

  const fetchEvent = async () => {
    setIsLoadingEvents(true);
    try {
      const response = await fetch(`${backendUrl}/event/${router.query.eventId}`);
      const resultApi = await response.json();
      const eventParsed = convertToEvent(resultApi);
      setEventData(eventParsed);
    } catch (error) {}

    setIsLoadingEvents(false);
  };

  // todo, fetch from backend ?
  const myTickets: Ticket[] | undefined = eventData && eventData?.ticketList.filter((ticket) => ticket.owner_address === address) 
    const isAttending = myTickets ? myTickets.length > 0 : false


  useEffect(() => {
    fetchEvent();
  }, []);
console.log(myTickets)
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
                <div className="grid grid-cols-2 gap-4">
                  <span>Artist Name :</span> <span>{eventData.artistName} </span>
                  <span>Date :</span> <span>{eventData.eventDate} </span>
                  <span>Ticket Price :</span><span>{eventData.price ? `${eventData.price} ETH` : "N/A"} </span>
                  <span>Ticket remaining :</span><span>{eventData.totalTickets - eventData.ticketsBooked} </span>
                  <span>Event contract address :</span><span>{eventData.id}</span> {/* TO CHECK : id is contract address */}
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
              {!isAttending || !myTickets ? (
                <span className="font-light">You don't have any tickets yet</span>
              ) : (
                isAttending &&
                myTickets.length > 0 && (
                  <div>
                    <div className="grid grid-cols-3 gap-8">
                      {myTickets.map(ticket => (
                        <div
                          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                          key={ticket.owner_address}
                        >
                          <span className="mb-2 font-medium text-sm tracking-tight text-gray-900 dark:text-white flex flex-col gap-3">
                            <span>Ticket address : {ticket.ticket_address}</span>
                           <span> Price : {ticket.price}</span>
                            <span>On Sale : {ticket.onSale? <div className="text-[#28bf0d]">YES</div> : <div className="text-[#e30505]">NO</div>}</span>
                          </span>
                        </div>
                      ))}{" "}
                    </div>

                    <ResellInput mytickets={myTickets.filter((ticket)=> ticket.onSale === false)} eventAddress={eventData.id} />
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