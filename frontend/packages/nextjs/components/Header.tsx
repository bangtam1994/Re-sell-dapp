import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const Header = () => {
  return (
    <div className="sticky h-28 border-b-[1px] border-white lg:static top-0 navbar min-h-0 flex-shrink-0 justify-between z-50 px-0 sm:px-2">
      <Link href={"/"}>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.3rem",
            }}
          >
            R
          </span>
          <Image alt="logo" src={"/nav_logo2.png"} width={80} height={80} />
        </div>
        <div className="m-4">
          <h1 className="font-orbitron">RE-SELL PROFIT</h1>
          <h1 className="font-orbitron">EVENTS</h1>
        </div>
      </Link>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
