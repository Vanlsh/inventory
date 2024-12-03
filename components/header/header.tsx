"use client";

import clsx from "clsx";

import Link from "next/link";
import CurrentDate from "./current-date";
import Logout from "./logout";

interface IHeaderProps {
  className?: string;
}

const Header = ({ className }: IHeaderProps) => {
  return (
    <header
      className={clsx(
        "bg-white shadow-sm relative z-10 shrink-0 py-2",
        className
      )}
    >
      <div className="container flex items-center mx-auto">
        <Link className="text-green-500 uppercase font-bold" href="/">
          Inventory
        </Link>

        <Logout className="ml-auto" />
        <CurrentDate className="ml-4" />
      </div>
    </header>
  );
};

export default Header;
