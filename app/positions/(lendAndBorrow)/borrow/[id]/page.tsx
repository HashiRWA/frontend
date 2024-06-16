"use client";

import { useParams } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";
import { getTokenDetails } from "@/constants";

import Image from "next/image";

const BorrowPositionPage = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState<string>();
  const [quotation, setQuotation] = useState<string>("1000");
  const { positions, repay, getRepayQuotation } = useContext(BlockChainContext);

  const position = positions.find((position) => position.id === id);
  const isMatured = new Date(position?.maturity * 1000) < new Date();

  console.log(quotation);

  useEffect(() => {
    (async () => {
      const data = await getRepayQuotation(position?.market);
      setQuotation(data?.quoteData.res);
    })();
  }, [position]);

  return (
    <div className="space-y-4 px-4 py-2 text-[#374950]">
      <div className="flex flex-col justify-between font-bold">
        <div className="flex -space-x-2">
          <Image src="/USDC.svg" alt="" width={30} height={30} />
          <Image src="/USDC.svg" alt="" width={30} height={30} />
        </div>
        <h1 className="text-lg">
        {position?.name} {getTokenDetails(position.asset)?.symbol} / {getTokenDetails(position.collateral)?.symbol}
        </h1>
        <p className="text-sm font-normal">
          {isMatured ? "Matured on" : "Matures on"}{" "}
          {new Date(position?.maturity * 1000).toLocaleDateString()}
        </p>
      </div>

      <div className="flex justify-between rounded-md border border-emerald-700 p-3">
        <div className="space-y-2 text-sm">
          <span>Amount at Maturity</span>

          <div className="space-x-5 font-semibold">
            <span>Principle: ${Number(quotation?.[0]) / (10**6)}</span>
            <span>Interest: ${Number(quotation?.[1]) / (10**6)}</span>
            <span>Collateral: ${Number(quotation?.[2]) / (10**6)}</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div>
            <input
              type="number"
              className="w-full rounded border p-2 ring-inset ring-emerald-800 transition hover:ring-[1.5px] focus:outline-none focus:ring-[1.5px]"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder="0.0"
              max={quotation?.[0]}
            />
          </div>

          <button
            onClick={() => {
              if (amount! > quotation?.[0]) {
                alert(`Amount can never be greater than ${quotation?.[0]}`);
                return;
              }
              repay(
                position?.market,
                amount!,
                position?.asset,
                position?.collateral,
                quotation?.[0],
              );
            }}
            className={`h-full rounded-md bg-slate-600 px-4 font-semibold transition-all duration-150 ease-in-out hover:bg-slate-500 ${!isMatured ? "bg-gray-400 text-gray-200" : "bg-blue-200"} cursor-pointer`}>
            Repay Debt
          </button>
        </div>
      </div>
    </div>
  );
};
export default BorrowPositionPage;
