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
    <div className="mx-auto max-w-[48rem]">
      <div className="flex items-center gap-2 pb-3">
        <Link href="/markets">
          <ArrowLeft />
        </Link>
        <h2 className="text-xl font-bold">Borrow</h2>
      </div>
      <div className="rounded-md border-2 p-4">
        <div className="flex gap-2 pb-3">
          <Image src="/USDC.svg" alt="" width={24} height={24} />
          <h3 className="text-lg font-bold">
            {market?.asset} / {market?.collateral.substring(0, 7)}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <div className="flex justify-between rounded-md border-2 p-2">
              <div className="space-y-1.5">
                {info.map((item) => (
                  <div key={item}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col space-y-1.5 text-right">
                <span>{market?.maturity}</span>
                <span className="font-bold">
                  {market?.transitionPrice}{" "}
                  <span className="text-xs font-medium">
                    {market?.asset} / {market?.collateral.substring(0, 7)}
                  </span>
                </span>
                <span>{market?.cdp}%</span>
              </div>
            </div>
            <div className="rounded-md border-2 p-2">
              <span className="flex justify-between font-bold">
                APR <span>{market?.apr}%</span>
              </span>
            </div>
            <div>
              <div className="flex justify-between rounded-md border-2 p-2">
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
          </div>

          <div className="space-y-5">
            <div className="space-y-5 rounded-md border-2 p-2">
              <div className="flex justify-between">
                <span className="font-bold">Amount to Borrow</span>
                <span>
                  Bal: {BALANCE} {market?.asset}{" "}
                  <span className="font-bold uppercase">Max</span>
                </span>
              </div>
              <div className="flex items-center divide-x-2 rounded border">
                <span className="px-4 text-base font-bold">
                  {market?.asset}
                </span>
                <input type="number" className="w-full p-2" placeholder="0.0" />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col space-y-2">
                  <span>Debt to Repay</span>
                  <span>Collateral to lock</span>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span>
                    {ASSET_VALUE}{" "}
                    <span className="font-bold">{market?.asset}</span>
                  </span>
                  <span>
                    {COLLATERAL_VALUE}{" "}
                    <span className="font-bold">
                      {market?.collateral.substring(0, 7)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button className="w-full rounded border-2 py-2 text-center text-[14px] font-semibold">
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
