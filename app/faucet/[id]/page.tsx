'use client'

import { BlockChainContext } from "@/context/BlockChainContext";
import useMint from "@/hooks/useMint";
import exp from "constants";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useContext, useState } from "react";

const Faucet = () => {
  const pathname = usePathname()
  const id = pathname.split("/")[2];

  const {  signer, connect, address} = useContext(BlockChainContext);
  const { createMint } = useMint();

  const [response, setResponse] = useState<any>(undefined);
  
  async function handleButtonClick() {
    let res = await createMint(
      signer,
      address!,
      id,
      "100000000000")
    setResponse(res);
  }
  
  return (
    <div className="w-full">
    {signer && address && id ? (
      <div className="mx-auto mb-4 mt-28 w-[90%] text-[#374950]">
        <div className="rounded-lg bg-white px-4 py-4 text-[14px]">
          <h1 className="text-[20px] font-semibold">Faucet</h1>
          <p className="mt-4">This faucet will mint you 1000 tokens.</p>
          {response ? (
            <div className="mt-4">
              <p className="font-semibold">Transaction Hash:</p>
              <p>{response.transactionHash}</p>
            </div>
          ) : 
          <button
            className="bg-[#FFD700] text-[#374950] px-4 py-2 rounded-lg mt-4"
            onClick={(e) => {
              e.preventDefault();
              handleButtonClick();
            }}
          >
            Mint 1000 Tokens
          </button>
          }
        </div>
      </div>
    )
    : (
      <div className="mx-auto mb-4 mt-28 w-[90%] text-[#374950]">
        <div className="rounded-lg bg-white px-4 py-4 text-[14px]">
          <h1 className="text-[20px] font-semibold">Faucet</h1>
          <p className="mt-4">Connect your wallet to mint tokens.</p>
          <button
            className="bg-[#FFD700] text-[#374950] px-4 py-2 rounded-lg mt-4"
            onClick={() => connect()}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    )}
    </div>
  );
}



export default Faucet;