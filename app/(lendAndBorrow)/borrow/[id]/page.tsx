"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import markets from "@/data/markets";
import Image from "next/image";

const info = ["Maturity", "Transcation Price", "CDP"];
const poolStats = ["TVL", "Total Volume", "Liquidity"];
const BALANCE = (0.0).toFixed(2);
const ASSET_VALUE = 0;
const COLLATERAL_VALUE = 0;

const BorrowPage = () => {
  const { id } = useParams();

  const market = markets.find((market) => market.id === Number(id));

  return (
    <div className="mx-auto w-[60%] p-6 rounded-lg bg-white mt-48 text-[#374950]">

      <div className="flex items-center gap-2 pb-3">
        <Link href="/markets">
          <ArrowLeft />
        </Link>
      </div>

      <div className="rounded-md p-4">
        <div className="flex gap-2 pb-3">
          <Image src="/USDC.svg" alt="" width={24} height={24} />
          <h3 className="text-lg font-bold">
            {market?.asset} / {market?.collateral.substring(0, 7)}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">

            <div className="flex justify-between rounded-md border border-teal-800  p-2">

              <div className="space-y-1.5">
                {info.map((item) => (
                  <div key={item}>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-1.5 text-right">
                <span>{market?.maturity}</span>
                <span >
                  {market?.transitionPrice}{" "}
                  <span className="text-xs font-medium">
                    {market?.asset} / {market?.collateral.substring(0, 7)}
                  </span>
                </span>
                <span>{market?.cdp}%</span>
              </div>


            </div>

            <div>
              <div className="flex justify-between rounded-md border border-teal-800  p-2">
                <div className="space-y-1.5">
                  {poolStats.map((stat) => (
                    <div key={stat}>
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-1.5 text-right">
                  <span>${market?.tvl.toLocaleString("en-US")}</span>
                  <span>${market?.totalVolume.toLocaleString("en-US")}</span>
                  <span>{market?.cdp}%</span>
                </div>
              </div>
            </div>

            <div className="p-2 text-lg border-t-2 border-dashed">
              <span className="flex justify-between font-semibold">
                APR <span>{market?.apr}%</span>
              </span>
            </div>

          </div>

          <div className="flex flex-col justify-between pb-2">
            <div className="space-y-5 rounded-md  bg-[#e4e4e4] p-4">
              <div className="flex justify-between">
                <span>
                  Bal: {BALANCE} {market?.asset}{" "}
                  <span className="font-bold uppercase">Max</span>
                </span>
              </div>
              <div className="flex items-center divide-x-2 rounded border border-emerald-800">
                <span className="pr-4 pl-2 flex gap-2 items-center">
                  <Image src="/USDC.svg" alt="" width={20} height={20} />
                  {market?.asset}
                </span>
                <input type="number" className="w-full p-2 rounded-r" placeholder="0.0" />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col space-y-2 font-semibold">
                  <span>Debt to Repay</span>
                  <span>Collateral to lock</span>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span>
                    {ASSET_VALUE}{" "}
                    <span>{market?.asset}</span>
                  </span>
                  <span>
                    {COLLATERAL_VALUE}{" "}
                    <span>
                      {market?.collateral.substring(0, 7)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button className="w-full  py-2 text-center text-[14px] font-semibold text-white gap-3 rounded  bg-emerald-800 hover:bg-emerald-900 transition-all duration-150 ease-in-out  px-8">
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
