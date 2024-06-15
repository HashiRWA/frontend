"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";
import Loader from "@/components/Loader";

const info = ["Maturity", "Strike Price", "CDP"];
const poolStats = ["Total Assests", "Total Volume", "Liquidity"];

const BALANCE = (0.0).toFixed(2);
const ASSET_VALUE = 0;
const COLLATERAL_VALUE = 0;

const LendPage = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState<string>();
  const { pools, lend, loading } = useContext(BlockChainContext);
  const market = pools.find((market) => market.id === id);

  return (
    <div className="mx-auto mt-48 w-[60%] rounded-lg bg-white p-6 text-[#374950] shadow-2xl">
      <div className="flex items-center gap-2 pb-3">
        <Link href="/markets">
          <ArrowLeft />
        </Link>
      </div>

      {loading ? (
        <div className="pb-9">
          <Loader />
        </div>
      ) : (
        <div className="rounded-md p-4 pt-0">
          <div className="flex gap-2 pb-3">
            <Image src="/USDC.svg" alt="" width={24} height={24} />
            <h3 className="text-xl font-bold">
              {market?.asset?.substring(0, 10)} /{" "}
              {market?.collateral?.substring(0, 10)}
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
                    {new Date(
                      market?.maturationdate * 1000,
                    ).toLocaleDateString()}
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
                        <span className="font-semibold">{stat}</span>
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
              <div className="space-y-5 rounded-md bg-[#f4fafa] p-4 ring-[1px] ring-[#00494d]">
                <div className="flex justify-end">
                  <span>
                    Bal: {BALANCE} {market?.asset.substring(0, 10)}{" "}
                    <span className="font-bold uppercase">Max</span>
                  </span>
                </div>
                <div className="divide flex items-center divide-x divide-emerald-900 rounded border border-emerald-800">
                  <span className="flex items-center gap-2 pl-2 pr-4">
                    <Image src="/USDC.svg" alt="" width={20} height={20} />
                    {market?.asset.substring(0, 10)}
                  </span>
                  <input
                    type="number"
                    className="w-full rounded-r p-2 ring-inset ring-emerald-800 transition hover:ring-[1.5px] focus:outline-none focus:ring-[1.5px]"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    placeholder="0.0"
                  />
                </div>
                <div className="space-y-2">
                  <span className="block text-center font-semibold">
                    Amount at Maturity
                  </span>
                  <div className="flex items-center justify-center gap-5">
                    <span>
                      {ASSET_VALUE}{" "}
                      <span className="font-bold">
                        {market?.asset.substring(0, 10)}
                      </span>
                    </span>
                    <span className="font-semibold uppercase">or</span>
                    <span>
                      {COLLATERAL_VALUE}{" "}
                      <span className="font-bold">
                        {market?.collateral.substring(0, 10)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => lend(id, amount!)}
                  className="w-full gap-3 rounded bg-teal-700 px-8 py-2 text-center text-[14px] font-semibold text-white transition-all duration-150 ease-in-out hover:bg-teal-900">
                  Lend
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LendPage;
