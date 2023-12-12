import { ReactNode } from "react";
import Link from "next/link";

type Props = {
  link?: string;
  children: ReactNode;
  onClick?: () => void;
  large?: boolean;
  full?: boolean;
};

export const Button = (props: Props) => {
  if (props.link) {
    return (
      <Link
        className={`${props.large && "lg:btn-lg"}  font-orbitron ${
          props.full ? "btn w-[80%] h-12 sm:btn-sm md:btn-md" : "btn btn-xs sm:btn-sm md:btn-md"
        }`}
        href={props.link}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      onClick={props.onClick}
      className={`${props.large && "lg:btn-lg"}  font-orbitron mt-8 ${
        props.full ? "btn w-[90%] h-12 sm:btn-sm md:btn-md" : "btn btn-xs sm:btn-sm md:btn-md"
      }`}
    >
      {props.children}
    </button>
  );
};
