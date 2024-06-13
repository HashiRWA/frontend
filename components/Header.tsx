"use client";

import { Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

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
    name: "Mutual Funds",
    path: "/mutual-funds",
  },
];

const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === pathname || pathname.startsWith(path);

  const { connect, signer } = useContext(AuthContext);

  return (
    <header className="p-5">
      <nav className="container mx-auto flex items-center justify-between space-x-1 px-6">
        <div className="rounded-md border px-0.5 py-2 font-bold">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`rounded px-3 py-2 ${
                isActive(link.path) && "bg-blue-400 text-white"
              } `}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="size-10 rounded bg-gray-700 px-3 py-2"></button>

          <button
            onClick={connect}
            className="flex gap-2 rounded border px-3 py-2">
            <Wallet />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
