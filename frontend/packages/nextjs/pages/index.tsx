import Link from "next/link";
import type { NextPage } from "next";
import { Button } from "~~/components/Button";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <h1>ALLOW NFTS TO SOLVE YOUR RESELL PROBLEM</h1>
        <h2>Create your event without limitations</h2>
        <div>
          <Button link="/create-event">Create New Event</Button>
          <Button link="/events">Existing Events</Button>
          <Button link="/events/my-events">My Events</Button>
          <Button link="/marketplace-resale">Resell Marketplace</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
