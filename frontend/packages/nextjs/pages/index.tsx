import Image from "next/image";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Button } from "~~/components/Button";
import { Divider } from "~~/components/Divider";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  const { isDisconnected } = useAccount();
  return (
    <div className="relative">
      <MetaHeader />
      {!isDisconnected && (
        <div className="text-center z-30 mt-3 sm:absolute sm:right-6 sm:top-6">
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
          <Divider>EVENTS I AM ATTENDING</Divider>
          <Divider>ALL OTHER EVENTS</Divider>
        </div>
      )}
    </div>
  );
};

export default Home;
