import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="select-none md:flex text-center md:text-left md:justify-between md:mx-10 lg:mx-16 xl:mx-48 2xl:mx-96 mt-10">
        <div className="flex flex-col tracking-wide">
          <p className="text-4xl md:text-7xl font-medium m-0">ALLOW NFTS TO</p>
          <p className="text-4xl md:text-7xl font-medium m-0">SOLVE YOUR</p>
          <p className="text-4xl md:text-7xl font-medium m-0">RESALE</p>
          <p className="text-4xl md:text-7xl font-medium m-0">PROBLEM</p>
          <p className="text-2xl md:text-2xl my-8 tracking-widest">Create your event without limitations</p>
        </div>
        <div className="hidden md:block relative">
          <Image className="absolute rotate-45 right-10" src={"/git_2.gif"} alt="gif2" width={135} height={135} />
          <Image className="mt-20" src={"/git_1.gif"} alt="gif1" width={300} height={300} />
        </div>
      </div>
    </>
  );
};

export default Home;
