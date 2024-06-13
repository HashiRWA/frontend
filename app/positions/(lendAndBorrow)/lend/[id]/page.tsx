"use client";

import { useParams } from "next/navigation";
import { useContext } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";

const ASSET = 5.2217;
const COLLATERAL = 3.2;

const LendPositionPage = () => {
  const { id } = useParams();
  const {positions} = useContext(BlockChainContext)

  const position = positions.find((position) => position.id === Number(id));
  const isMatured = new Date(position?.maturity*1000) < new Date();

  const handleCloseButton = () => {
    
  };

  return (
    <div className="space-y-4 px-4 py-5">
      <div className="flex justify-between">
        <h1>
          {position?.asset?.substring(0,10)} / {position?.collateral?.substring(0,10)}
        </h1>
        <p className="text-sm">
          {isMatured ? "Matured on" : "Matures on"} {new Date(position?.maturity * 1000).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-between rounded-md border-2 p-3">
        <div className="space-y-2 text-sm">
          <span>Amount at Maturity</span>
          <div className="space-x-5 font-semibold">
            <span>
              {ASSET} {position?.asset?.substring(0,10)}
            </span>
            <span className="uppercase">Or</span>
            <span>
              {COLLATERAL} {position?.collateral?.substring(0,10)}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={handleCloseButton}
            className={`h-full rounded-md px-4 font-semibold ${!isMatured ? "bg-gray-400 text-gray-200" : "bg-blue-200"}`}
            disabled={!isMatured}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default LendPositionPage;
