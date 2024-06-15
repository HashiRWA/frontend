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
    <div className="mb-3 mt-28 w-[70%] space-y-5 text-[#374950]">
      <Profile
        details={mutualFund?.profile}
        investments={mutualFund?.investmentTypes}
      />
      <div className="grid grid-cols-2 gap-x-5 rounded-lg bg-white px-3 py-8">
        <div className="gap-4 space-y-4 px-4">
          <h1 className="px-2 text-4xl font-bold">{mutualFund?.name}</h1>

          <div className="space-y-2">
            <div className="flex justify-between rounded-lg border border-emerald-800 px-2 py-3 text-sm">
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

            <div className="space-y-2 rounded-lg">
              <div className="space-y-2">
                <span className="flex justify-end gap-1 text-sm font-bold">
                  <span>{BALANCE.toFixed(2)} </span>
                  Bal
                </span>
                <div className="flex items-center divide-x divide-emerald-800 rounded-sm border border-emerald-800">
                  <span className="px-4 text-base font-bold">
                    <Image src="/USDC.svg" width={30} height={30} alt="" />
                  </span>
                  <input
                    type="number"
                    className="w-full p-2 ring-inset ring-emerald-800 transition hover:ring-[1.5px] focus:outline-none focus:ring-[1.5px]"
                    placeholder="0.0"
                  />
                </div>
              </div>
              <div>
                <button className="w-full rounded-sm bg-teal-800 py-2 text-center text-[14px] font-semibold text-white transition hover:bg-teal-900">
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
        <AssetsInvestedList assetsInvested={mutualFund?.assetsInvested} />
      </div>
    </div>
  );
};
export default MutualFundPage;
