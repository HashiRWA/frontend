"use client"

import Link from "next/link";
import Image from "next/image";
import { Market } from "@/types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import { BlockChainContext } from "@/context/BlockChainContext";
import { getTokenDetails } from "@/constants";

const MarketList = ({ markets }: { markets: Market[] }) => {

	const {
		pools,
		loading
	} = useContext(BlockChainContext)
	
	return (
		<div className="mx-auto w-[90%] flex flex-col items-center  rounded-lg bg-white py-2">

			<div className="flex justify-between border-b p-3 mb-2 text-sm font-medium text-[#374950] uppercase px-8 w-full">
				<span className="w-2/4">Markets (Asset / Collateral)</span>
				<span>Deposit Interest Rate</span>
				<span>Debt Interest Rate</span>
				<span>CDP</span>
				<span>Maturity</span>
			</div>

			{loading&&<div className="loader"></div>}

			<div className="divide-y divide-dashed w-full">
				{pools.map((market, index) => (
					<div key={index} className="text-[0.85rem] pt-4 flex flex-col items-center">

						<div className="flex justify-between px-10 w-full">

							<span className="flex w-2/4 items-center gap-1 font-medium">
								<div className="flex -space-x-2">
									<Image src="/USDC.svg" alt="" width={30} height={30} />
									<Image src="/USDC.svg" alt="" width={30} height={30} />
								</div>
								{getTokenDetails(market?.asset) ? getTokenDetails(market?.asset)?.symbol : market?.asset?.substring(0,20)} / {getTokenDetails(market?.collateral) ? getTokenDetails(market?.collateral)?.symbol : market?.collateral?.substring(0,20)}
							</span>

							<span>{market?.debtinterestrate}%</span>
							<span>{market?.lendinterestrate}%</span>
							<span>{market?.overcollateralizationfactor*100}</span>
							<span>{new Date(market?.maturationdate * 1000).toLocaleDateString()}</span> 
						</div>

						<div className="flex gap-3 text-[0.8rem] border-[.5px] border-teal-700 w-[95%] my-4 px-5 rounded-md">

							<div className="flex w-2/4 gap-x-5 ">
								<div className="flex flex-col p-2 rounded-lg w-max">
									<span className="flex gap-x-3 ">
										<span className="font-bold">Total Assets:</span>
										<span>{Number(market?.totalAssets) / (10 ** getTokenDetails(market?.asset).decimals  ) } {getTokenDetails(market?.asset) ? getTokenDetails(market?.asset)?.symbol : market?.asset?.substring(0,20)}</span>
									</span>

									<span className="flex gap-x-3">
										<span className="font-bold">Total Collateral:</span>
										<span>{Number(market?.totalCollateral) / (10 ** getTokenDetails(market?.collateral).decimals  ) } {getTokenDetails(market?.collateral) ? getTokenDetails(market?.collateral)?.symbol : market?.collateral?.substring(0,20)}</span>
									</span>

									<div className="flex items-center gap-2 ">
										<span className="font-bold">Strike Price:</span>
										<span className="flex gap-2 text-xs">
											<span>{market?.strikeprice}</span>
											<span>{getTokenDetails(market?.collateral) ? getTokenDetails(market?.collateral)?.symbol : market?.collateral?.substring(0,20)} / {getTokenDetails(market?.asset) ? getTokenDetails(market?.asset)?.symbol : market?.asset?.substring(0,20)} </span>
										</span>
									</div>
								</div>
							</div>


							<div className="flex flex-1 items-center justify-end gap-5 ">
								<Link
									href={`/lend/${market?.id}`}
									className="flex items-center text-white gap-3 rounded  bg-emerald-800 hover:bg-emerald-900 transition-all duration-150 ease-in-out  px-8 py-2 font-medium"
								>
									<ArrowDown size={20} />
									Lend
								</Link>
								<Link
									href={`/borrow/${market?.id}`}
									className="flex items-center text-white gap-3 rounded  bg-teal-800 hover:bg-teal-900 transition-all duration-150 ease-in-out  px-8 py-2 font-medium"
								>
									<ArrowUp size={20} />
									Borrow
								</Link>
							</div>
						</div>

					</div>
				))}

			</div>
		</div>
	);
};

export default MarketList;
