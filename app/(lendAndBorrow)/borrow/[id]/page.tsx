"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTokenDetails } from "@/constants";
import Image from "next/image";

import { useContext, useState,useEffect } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";

import {useBalance} from "@/hooks/useBalance"
const info = ["Maturity", "Strike Price", "CDP"];
const poolStats = ["Total Assests","Total Volume", "Liquidity"];


const BorrowPage = () => {
  const { id } = useParams();
  const {pools, loading, borrow,address,signer} = useContext(BlockChainContext);
  const [amount,setAmount] = useState<string>();
  const [balance,setBalance] = useState<string>();
  const market = pools.find((market) => market.id === id);

  useEffect(()=>{
    (async()=>{
        if(!signer) return

        const res = await useBalance({
          address:address!,
          denom:market?.collateral,
          signer
        })

        console.log(res)
        setBalance(res.balance)
    })()
  },[market?.collateral])

  return (
    <div className="mx-auto w-[60%] p-6 rounded-lg bg-white mt-48 text-[#374950]">

      <div className="flex items-center gap-2 pb-3">
        <Link href="/markets">
          <ArrowLeft />
        </Link>
      </div>

      {loading&&<div className="loader"></div>}


      <div className="rounded-md p-4">


        <div className="flex gap-2 pb-3">
          <Image src="/USDC.svg" alt="" width={24} height={24} />
          <h3 className="text-lg font-bold">
          {getTokenDetails(market?.asset) ? getTokenDetails(market?.asset)?.symbol : market?.asset?.substring(0,20)} /  {getTokenDetails(market?.collateral) ? getTokenDetails(market?.collateral)?.symbol : market?.collateral?.substring(0,20)}
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
                <span>{new Date(market?.maturationdate * 1000).toLocaleDateString()}</span>
                <span >
                  {market?.strikeprice}{" "}
                  <span className="text-xs font-medium">
                    {getTokenDetails(market?.asset) ? getTokenDetails(market?.asset)?.symbol : market?.asset?.substring(0,20)} /   {getTokenDetails(market?.collateral) ? getTokenDetails(market?.collateral)?.symbol : market?.collateral?.substring(0,20)}
                  </span>
                </span>
                <span>{market?.overcollateralizationfactor*100}%</span>
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
                  <span>${market?.totalAssets}</span>
                  <span>${market?.totalCollateral}</span>
                  <span>{market?.overcollateralizationfactor*100}%</span>
                </div>
              </div>
            </div>

            <div className="p-2 text-lg border-t-2 border-dashed">
              <span className="flex justify-between font-semibold">
              LIR <span>{market?.lendinterestrate}%</span>

              </span>
            </div>

          </div>

          <div className="flex flex-col justify-between pb-2">
            <div className="space-y-5 rounded-md  bg-[#e4e4e4] p-4">
              <div className="flex justify-between">
                <span>
                  Bal: {balance} {getTokenDetails(market?.collateral) ? getTokenDetails(market?.collateral)?.symbol : market?.collateral?.substring(0,20)}
                  <span className="font-bold uppercase"> Max</span>
                </span>
              </div>
              <div className="flex items-center divide-x-2 rounded border border-emerald-800">
                <span className="pr-4 pl-2 flex gap-2 items-center">
                  <Image src="/USDC.svg" alt="" width={20} height={20} />
                  {getTokenDetails(market?.asset) ? getTokenDetails(market?.asset)?.symbol : market?.asset?.substring(0,20)}
                </span>
                <input type="number" className="w-full p-2 rounded-r" onChange={(e)=>setAmount(e.target.value)} value={amount} placeholder="0.0" />

              </div>
              <div className="flex justify-between">
                <div className="flex flex-col space-y-2 font-semibold">
                  <span>Debt to Repay</span>
                  <span>Collateral to lock</span>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span>
                    <span> { Number(market?.totalAssets)/ (10 ** getTokenDetails(market?.asset)?.decimals  )} {getTokenDetails(market?.asset) ? getTokenDetails(market?.asset)?.symbol : market?.asset?.substring(0,20)}</span>
                  </span>
                  <span>
                    <span>
                    { Number(market?.totalCollateral)/(10 ** getTokenDetails(market?.collateral)?.decimals  )} {getTokenDetails(market?.collateral) ? getTokenDetails(market?.collateral)?.symbol : market?.collateral?.substring(0,20)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button onClick={()=>borrow(market?.id,amount!,market?.asset,market?.collateral)} className="w-full  py-2 text-center text-[14px] font-semibold text-white gap-3 rounded  bg-teal-800 hover:bg-teal-900 transition-all duration-150 ease-in-out  px-8">
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
