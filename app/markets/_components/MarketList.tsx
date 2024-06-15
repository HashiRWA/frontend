"use client";

import Link from "next/link";
import Image from "next/image";
import { Market } from "@/types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useContext } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";

const MarketList = ({ markets }: { markets: Market[] }) => {
  const { pools, loading } = useContext(BlockChainContext);

  return (
    <div className="mx-auto flex w-[90%] flex-col items-center rounded-lg bg-white py-2">
      <div className="mb-2 flex w-full justify-between border-b p-3 px-8 text-sm font-medium uppercase text-[#374950]">
        <span className="w-[48%]">Pools (Asset / Collateral)</span>
        <span className="w-[9%]">Debt %</span>
        <span className="w-[7%]">LIR</span>
        <span className="w-[9%] pl-2">Cdp</span>
        <span className="w-[9%]">Maturity</span>
      </div>

      {loading && <div className="loader"></div>}

      <div className="w-full divide-y divide-dashed">
        {pools.map((market, index) => (
          <div
            key={index}
            className="flex flex-col items-center pt-4 text-[0.85rem]">
            <div className="flex w-full justify-between gap-3 px-8">
              <span className="flex w-2/4 items-center gap-1 font-medium">
                <div className="flex -space-x-2">
                  <Image src="/USDC.svg" alt="" width={30} height={30} />
                  <Image src="/USDC.svg" alt="" width={30} height={30} />
                </div>
                {market?.asset?.substring(0, 20)} /{" "}
                {market?.collateral?.substring(0, 20)}
              </span>

              <span className="w-[9%]">{market?.debtinterestrate}%</span>
              <span className="w-[9%]">{market?.lendinterestrate}%</span>
              <span className="w-[9%]">
                {market?.overcollateralizationfactor * 100}
              </span>
              <span className="w-[9%]">
                {new Date(market?.maturationdate * 1000).toLocaleDateString()}
              </span>
            </div>

            <div className="my-4 flex w-[95%] gap-3 rounded-md border-[.5px] border-teal-700 px-5 text-[0.8rem]">
              <div className="flex w-2/4 gap-x-5">
                <div className="flex w-max flex-col rounded-lg p-2">
                  <span className="flex gap-x-3">
                    <span className="font-bold">Total Assets:</span>
                    <span>{market?.totalAssets}</span>
                  </span>

                  <span className="flex gap-x-3">
                    <span className="font-bold">Total Collateral:</span>
                    <span>${market?.totalCollateral}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">Strike Price:</span>
                    <span className="flex gap-2 text-xs">
                      <span>{market?.strikeprice}</span>
                      {market?.asset?.substring(0, 20)}/
                      {market?.collateral?.substring(0, 20)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-end gap-5">
                <Link
                  href={`/lend/${market?.id}`}
                  className="flex items-center gap-3 rounded bg-emerald-800 px-8 py-2 font-medium text-white transition-all duration-150 ease-in-out hover:bg-emerald-900">
                  <ArrowDown size={20} />
                  Lend
                </Link>
                <Link
                  href={`/borrow/${market?.id}`}
                  className="flex items-center gap-3 rounded bg-teal-800 px-8 py-2 font-medium text-white transition-all duration-150 ease-in-out hover:bg-teal-900">
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
