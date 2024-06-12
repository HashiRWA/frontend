"use client";


import { Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from '@/context/AuthContext';

const links = [
  {
    name: "Markets",
    path: "/markets",
  },
  {
    name: "Positions",
    path: "/positions",
  },
];

const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname || pathname.startsWith(path);

  const {connect,signer} = useContext(AuthContext)

  return (
    <header className="p-5">
      <nav className="space-x-1 container mx-auto flex justify-between items-center px-6">
        <div className="border font-bold py-2 rounded-md px-0.5">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-3 py-2 rounded ${
                isActive(link.path) && "bg-blue-400 text-white"
              } `}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-gray-700 px-3 py-2 rounded size-10"></button>

          <button 
            onClick={connect}
            className="rounded flex gap-2 border px-3 py-2">
            <Wallet />
          </button>

        </div>
      </nav>
    </header>
  );
};

export default Header;
