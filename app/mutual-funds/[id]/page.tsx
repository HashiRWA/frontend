"use client";

import { useParams } from "next/navigation";
import mutualFunds from "@/data/mutualFunds";
import Image from "next/image";
import AssetsInvestedList from "./_components/AssetsInvestedList";
import Profile from "./_components/Profile";

const TEMP_INFO = "abcd";
const BALANCE = 0;

const MutualFundPage = () => {
  const { id } = useParams();

  const mutualFund = mutualFunds.find((fund) => fund.id === Number(id));

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-20 rounded-md px-5 py-4">
      <div className="gap-4 space-y-5 px-4">
        <h1 className="px-2 text-4xl font-bold">{mutualFund?.name}</h1>
        <div className="space-y-12">
          <div className="flex justify-between rounded-md border-2 px-2 py-3 text-lg">
            <ul className="space-y-2 font-medium">
              <li>Total Price</li>
              <li>{TEMP_INFO}</li>
              <li>Rate of Return</li>
            </ul>
            <ul className="flex flex-col items-end gap-2">
              <li>{mutualFund?.usdc.toLocaleString("en-US")} USDC</li>
              <li>{TEMP_INFO}</li>
              <li>{mutualFund?.rate}%</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div>
              <span className="flex justify-end gap-1 text-sm">
                <span className="font-medium">{BALANCE.toFixed(2)} </span>
                Bal
              </span>
              <div className="flex items-center divide-x-2 rounded border">
                <span className="px-4 text-base font-bold">
                  <Image src="/USDC.svg" width={30} height={30} alt="" />
                </span>
                <input type="number" className="w-full p-2" placeholder="0.0" />
              </div>
            </div>
            <div>
              <button className="w-full rounded border-2 py-2 text-center text-[14px] font-semibold transition hover:bg-zinc-200">
                Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
      <AssetsInvestedList assetsInvested={mutualFund?.assetsInvested} />
      <div className="col-span-2">
        <Profile
          details={mutualFund?.profile}
          investments={mutualFund?.investmentTypes}
        />
      </div>
    </div>
  );
};
export default MutualFundPage;
