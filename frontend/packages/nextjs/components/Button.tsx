import { ReactNode } from "react";
import Link from "next/link";

type Props = {
  link?: string;
  children: ReactNode;
  onClick?: () => void;
};

export const Button = (props: Props) => {
  if (props.link) {
    return (
      <Link className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" href={props.link}>
        {props.children}
      </Link>
    );
  }
  return (
    <button onClick={props.onClick} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
      {props.children}
    </button>
  );
};
