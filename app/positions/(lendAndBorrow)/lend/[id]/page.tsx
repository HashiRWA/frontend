"use client";

import { useParams } from "next/navigation";
import { useContext,useState, useEffect } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";
import { getTokenDetails } from "@/constants";

import Image from "next/image";



const LendPositionPage = () => {
  const { id } = useParams();
  const [amount,setAmount] = useState<string>()
  const [quotation,setQuotation] = useState<string>("1000")

  const {positions,withdraw, withdrawInterest, loading,getWithdrawQuotation} = useContext(BlockChainContext)

  const position = positions.find((position) => position.id === id);
  const isMatured = new Date(position?.maturity*1000) < new Date();

  useEffect(()=>{
    (async()=>{
        const data = await getWithdrawQuotation(position?.market)
        setQuotation(data?.quoteData.res)
    })()
  },[position])

  return (
    <div className="space-y-4 px-4 py-2 text-[#374950]">

        {loading&&<div className="loader"></div>}

        <div className="flex flex-col justify-between font-bold">
          <div className="flex -space-x-2">
            <Image src="/USDC.svg" alt="" width={30} height={30} />
            <Image src="/USDC.svg" alt="" width={30} height={30} />
          </div>
          <h1 className="text-lg">
            {getTokenDetails(position?.asset) ? getTokenDetails(position?.asset)?.symbol : position?.asset?.substring(0,20)} /  {getTokenDetails(position?.collateral) ? getTokenDetails(position?.collateral)?.symbol : position?.collateral?.substring(0,20)}
          </h1>
          <p className="text-sm font-normal">
            {isMatured ? "Matured on" : "Matures on"} {new Date(position?.maturity * 1000).toLocaleDateString()}
          </p>
        </div>
      
        <div className="flex justify-between rounded-md border border-emerald-700 p-3">
            <div className="space-y-2 text-sm">
              <span>Amount at Maturity</span>

              <div className="space-x-5 font-semibold">
                <span>Principle: ${quotation?.[0]}</span>
                <span>Interest: {quotation?.[1]}%</span>
                <span>Collateral: ${quotation?.[2]}</span>
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <div>
                <input 
                  type="number" 
                  className="w-full p-2 rounded border" 
                  onChange={(e)=>setAmount(e.target.value)} 
                  value={amount} 
                  placeholder="0.0" 
                  max={position?.principle} 
                />
              </div>


              <button
                onClick={()=>{
                  if(amount!>position?.principle){
                    alert(`Amount can never be greater than ${position?.principle}`)
                    return
                  }
                  withdraw(position?.market,amount!)
                }}
                className={`h-full rounded-md px-4 bg-slate-600 hover:bg-slate-500 transition-all duration-150 ease-in-out font-semibold ${!isMatured ? "bg-gray-400 text-gray-200" : "bg-blue-200"} cursor-pointer`}>
                Withdraw Principle
              </button>
              <button
                onClick={()=>withdrawInterest(position?.market)}
                className={`h-full rounded-md px-4 bg-slate-600 hover:bg-slate-500 transition-all duration-150 ease-in-out font-semibold ${!isMatured ? "bg-gray-400 text-gray-200" : "bg-blue-200"} cursor-pointer`}>
                Withdraw Interest
              </button>

            </div>
        </div>
    </div>
  );
};
export default LendPositionPage;
