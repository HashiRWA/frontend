"use client";

import PositionList from "./_components/PositionList";
import { useContext } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";
import { Position } from "../../types";
import { Wallet } from "lucide-react";
import Loader from "@/components/Loader";

function dividePositions(positions: Position[]) {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in Unix timestamp

  const active: Position[] = [];
  const matured: Position[] = [];

  positions.forEach((position) => {
    if (position.maturity > currentTimestamp) {
      active.push(position);
    } else {
      matured.push(position);
    }
  });

  return { active, matured };
}

const PositionsPage = () => {
  const { positions, signer, connect, loading } = useContext(BlockChainContext);
  const { active, matured } = dividePositions(positions);

  return (
    <div className="mx-auto mb-4 mt-28 flex w-[90%] flex-col items-center rounded-lg bg-white py-5 shadow-2xl">
      {signer ? (
        <div className="flex w-full flex-col gap-20 px-4">
          <PositionList title="Active" positions={active} loading={loading} />
          <PositionList title="Matured" positions={matured} loading={loading} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 py-16">
          <h3 className="text-center text-lg font-semibold">
            Connect to a wallet to view your positions.
          </h3>
          <button
            className="group flex gap-3 rounded bg-[#00494d] p-3 font-semibold text-[#E0F6EC] ring-inset ring-[#00494d] transition-colors hover:bg-[#E0F6EC] hover:text-[#00494d] hover:ring-[1px]"
            onClick={connect}>
            <Wallet />
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};
export default PositionsPage;
