import Link from "next/link";
import Image from "next/image";
import { Market } from "@/types";
import { ArrowDown, ArrowUp } from "lucide-react";

const MarketList = ({ markets }: { markets: Market[] }) => {
  return (
    <div className="mx-auto max-w-[45rem] border border-gray-700">
      <div className="flex justify-between border-b-2 p-5 text-sm font-bold uppercase">
        <span className="w-2/4">Pools (Asset / Collateral)</span>
        <span>Tvl</span>
        <span>Apr</span>
        <span>Cdp</span>
        <span>Maturity</span>
      </div>

      <div className="divide-y">
        {markets.map((market, index) => (
          <div key={index} className="px-5 py-4 text-[0.85rem]">
            <div className="flex justify-between">
              <span className="flex w-2/4 items-center gap-1">
                <Image src="/USDC.svg" alt="" width={24} height={24} />
                <Image src="/USDC.svg" alt="" width={24} height={24} />
                {market.asset} / {market.collateral}
              </span>
              <span>${market.tvl.toLocaleString("en-US")}</span>
              <span>{market.apr.toFixed(2)}%</span>
              <span>{market.cdp.toFixed(2)}%</span>
              <span>{market.maturity}</span>
            </div>

            <div className="flex gap-3 py-3 text-[0.8rem]">
              <div className="flex w-2/4 gap-x-5">
                <div className="flex flex-col">
                  <span className="flex justify-between">
                    Liquidty
                    <span>{market.liquidity.toLocaleString("en-US")}</span>
                  </span>
                  <span className="flex gap-x-3">
                    Total Volume{" "}
                    <span>${market.totalVolume.toLocaleString("en-US")}</span>
                  </span>
                </div>
                <div className="flex flex-col">
                  Transition Price
                  <span className="flex gap-2 text-xs">
                    <span className="font-bold">{market.transitionPrice}</span>
                    {market.asset}/{market.collateral.substring(0, 7)}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-evenly gap-5">
                <Link
                  href={`/lend/${market.id}`}
                  className="flex items-center gap-3 rounded border bg-blue-300 px-8 py-2 font-bold">
                  <ArrowDown size={20} />
                  Lend
                </Link>
                <Link
                  href={`/borrow/${market.id}`}
                  className="flex items-center gap-3 rounded border bg-blue-300 px-8 py-2 font-bold">
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
