"use client";

import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";
import Image from "next/image";

const LendPositionPage = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState<string>();
  const { positions, withdraw, withdrawInterest } =
    useContext(BlockChainContext);

  const position = positions.find((position) => position.id === id);
  const isMatured = new Date(position?.maturity * 1000) < new Date();

  return (
    <div className="space-y-4 px-4 py-2 text-[#374950] shadow-2xl">
      <div className="flex flex-col justify-between font-bold">
        <div className="flex -space-x-2">
          <Image src="/USDC.svg" alt="" width={30} height={30} />
          <Image src="/USDC.svg" alt="" width={30} height={30} />
        </div>
        <h1 className="text-lg">
          {position?.asset?.substring(0, 10)} /{" "}
          {position?.collateral?.substring(0, 10)}
        </h1>
        <p className="text-sm font-normal">
          {isMatured ? "Matured on" : "Matures on"}{" "}
          {new Date(position?.maturity * 1000).toLocaleDateString()}
        </p>
      </div>

      <div className="flex justify-between rounded-md border border-emerald-700 p-3">
        <div className="space-y-2 text-sm">
          <span>Amount at Maturity</span>

          <div className="space-x-5 font-semibold"></div>
        </div>

        <div className="flex items-center gap-5">
          <div>
            <input
              type="number"
              className="w-full rounded border p-2"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder="0.0"
              max={position?.principle}
            />
          </div>

          <button
            onClick={() => {
              if (amount! > position?.principle) {
                alert(
                  `Amount can never be greater than ${position?.principle}`,
                );
                return;
              }
              withdraw(position?.market, amount!);
            }}
            className={`h-full rounded-md bg-slate-600 px-4 font-semibold transition-all duration-150 ease-in-out hover:bg-slate-500 ${!isMatured ? "bg-gray-400 text-gray-200" : "bg-blue-200"} cursor-pointer`}>
            Withdraw Principle
          </button>
          <button
            onClick={() => withdrawInterest(position?.market)}
            className={`h-full rounded-md bg-slate-600 px-4 font-semibold transition-all duration-150 ease-in-out hover:bg-slate-500 ${!isMatured ? "bg-gray-400 text-gray-200" : "bg-blue-200"} cursor-pointer`}>
            Withdraw Interest
          </button>
        </div>
      </div>
    </div>
  );
};
export default LendPositionPage;
