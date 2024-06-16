"use client";

import { Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";
import Image from "next/image";

const links = [
  {
    name: "Markets",
    path: "/markets",
  },
  {
    name: "Positions",
    path: "/positions",
  },
  {
    name: "Admin",
    path: "/admin",
  },
  {
    name: "Mutual Funds",
    path: "/mutual-funds",
  },
];

const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === pathname || pathname.startsWith(path);

  const { connect, signer, address } = useContext(BlockChainContext);

  return (
    <header className="fixed top-0 z-10 m-5 w-[60%] rounded-full bg-transparent bg-white py-1 shadow-lg">
      <nav className="flex items-center justify-between px-8">
        <Link href="/markets">
          <Image
            className="cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:animate-spin hover:drop-shadow-lg"
            height={40}
            width={40}
            src={"/logo.svg"}
            alt="logo"
          />
        </Link>

        <div className="text-sm flex items-center gap-4 rounded-md px-0.5 py-2 font-medium text-[#374950b1]">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`rounded px-3 py-2 transition-all duration-150 ease-in-out hover:text-[#374950] ${
                isActive(link.path) && "text-[#374950]"
              } `}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {signer ? (
            <div className="flex gap-2 rounded border px-3 py-2">
              	{address?.slice(0,6)}...{address?.slice(-4)}
              <Image height={25} width={25} src={"/keplr.png"} alt="logo" />
            </div>
          ) : (
            <button
              onClick={connect}
              className="flex gap-2 rounded border px-3 py-2">
              <div> Connect Wallet </div>
              <Wallet />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
