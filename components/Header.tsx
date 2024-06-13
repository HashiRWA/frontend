"use client";

import { Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { BlockChainContext } from '@/context/BlockChainContext';
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
		name: "Mutual Funds",
		path: "/mutualfunds",
	},
];

const Header = () => {
	const pathname = usePathname();
	const isActive = (path: string) => path === pathname || pathname.startsWith(path);

	const {connect,signer} = useContext(BlockChainContext)

	return (
		<header className="fixed top-0 w-[60%] m-5 bg-white rounded-full bg-transparent z-10 py-1">

			<nav className="flex justify-between items-center px-8">


				<Link href="/markets">
					<Image
						className="hover:animate-spin hover:drop-shadow-lg cursor-pointer transition-all ease-in-out duration-200 drop-shadow-md"
						height={40}
						width={40}
						src={"/logo.svg"}
						alt="logo"
					/>
				</Link>

				
				<div className="py-2 flex items-center gap-4 rounded-md text-md px-0.5 text-[#374950b1]">
					{links.map((link) => (
						<Link
							key={link.path}
							href={link.path}
							className={` px-3 hover:text-[#374950]  py-2 rounded transition-all duration-150 ease-in-out ${
								isActive(link.path) && "text-[#374950]"
							} `}>
							{link.name}
						</Link>
					))}
				</div>

				<div className="flex items-center gap-4">
					{
						signer?
						<div 
							className="rounded flex gap-2 border px-3 py-2"
						>
							<Image
								height={25}
								width={25}
								src={"/keplr.png"}
								alt="logo"
							/>

						</div>:
						<button 
							onClick={connect}
							className="rounded flex gap-2 border px-3 py-2"
						>
							<Wallet />
						</button>
					}

				</div>

			</nav>
		</header>
	);
};

	export default Header;
