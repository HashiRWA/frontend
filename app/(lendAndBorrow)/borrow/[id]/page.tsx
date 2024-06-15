"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import markets from "@/data/markets";
import Image from "next/image";

import { useContext, useState } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";

const info = ["Maturity", "Strike Price", "CDP"];
const poolStats = ["Total Assests", "Total Volume", "Liquidity"];

const BorrowPage = () => {
  const { id } = useParams();
  const { pools, loading, borrow } = useContext(BlockChainContext);
  const [amount, setAmount] = useState<string>();
  const market = pools.find((market) => market.id === id);

  return (
    <div className="mx-auto mt-48 w-[60%] rounded-lg bg-white p-6 text-[#374950]">
      <div className="flex items-center gap-2 pb-3">
        <Link href="/markets">
          <ArrowLeft />
        </Link>
      </div>

      {loading && <div className="loader"></div>}

      <div className="rounded-md p-4 pt-0">
        <div className="flex gap-2 pb-3">
          <Image src="/USDC.svg" alt="" width={24} height={24} />
          <h3 className="text-xl font-bold">
            {market?.asset?.substring(0, 10)} /{" "}
            {market?.collateral.substring(0, 10)}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <div className="flex justify-between rounded-md border border-teal-800 p-2">
              <div className="space-y-1.5">
                {info.map((item) => (
                  <div key={item}>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-1.5 text-right">
                <span>
                  {new Date(market?.maturationdate * 1000).toLocaleDateString()}
                </span>
                <span>
                  {market?.strikeprice}{" "}
                  <span className="text-xs font-medium">
                    {market?.asset?.substring(0, 10)} /{" "}
                    {market?.collateral?.substring(0, 10)}
                  </span>
                </span>
                <span>{market?.overcollateralizationfactor * 100}%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between rounded-md border border-teal-800 p-2">
                <div className="space-y-1.5">
                  {poolStats.map((stat) => (
                    <div key={stat}>
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-1.5 text-right">
                  <span>${market?.totalAssets}</span>
                  <span>${market?.totalCollateral}</span>
                  <span>{market?.overcollateralizationfactor * 100}%</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-dashed p-2 text-lg">
              <span className="flex justify-between font-semibold">
                Lend Interest Rate <span>{market?.lendinterestrate}%</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between pb-2">
            <div className="space-y-5 rounded-md bg-[#e4e4e4] p-4">
              <div className="flex justify-between">
                <span>
                  Bal: {market?.asset?.substring(0, 10)}
                  <span className="font-bold uppercase">Max</span>
                </span>
              </div>
              <div className="flex items-center divide-x-2 rounded border border-emerald-800">
                <span className="flex items-center gap-2 pl-2 pr-4">
                  <Image src="/USDC.svg" alt="" width={20} height={20} />
                  {market?.asset?.substring(0, 10)}
                </span>
                <input
                  type="number"
                  className="w-full rounded-r p-2"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  placeholder="0.0"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col space-y-2 font-semibold">
                  <span>Debt to Repay</span>
                  <span>Collateral to lock</span>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span>
                    <span>{market?.asset?.substring(0, 10)}</span>
                  </span>
                  <span>
                    <span>{market?.collateral?.substring(0, 10)}</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() =>
                  borrow(market?.id, amount!, market?.asset, market?.collateral)
                }
                className="w-full gap-3 rounded bg-teal-800 px-8 py-2 text-center text-[14px] font-semibold text-white transition-all duration-150 ease-in-out hover:bg-teal-900">
                Borrow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BorrowPage;
