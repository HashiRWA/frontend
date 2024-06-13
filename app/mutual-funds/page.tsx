import mutualFunds from "@/data/mutualFunds";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const MutualFundPage = () => {
  return (
    <div className="flex items-start justify-center py-10">
      <div className="rounded-md border-2 py-2 text-[14px]">
        <div className="grid grid-cols-3 justify-items-center gap-20 border-b-2 border-b-zinc-400 px-4 py-2 text-lg font-bold">
          <span className="justify-self-start">Mutual Fund</span>
          <span>Return Rate</span>
          <span>% Stable by RWA</span>
        </div>
        <div className="divide-y">
          {mutualFunds.map((fund) => (
            <div
              className="grid grid-cols-3 items-center justify-items-center gap-14 p-4"
              key={fund.id}>
              <div className="justify-self-start">
                <span>{fund.name}</span>
              </div>
              <div className="">
                <span>{fund.rate}%</span>
              </div>
              <div>
                <span className="flex items-center gap-3">
                  {fund.stabilityByRWA}%{" "}
                  <span className="text-xs text-zinc-600">stable by RWA</span>
                  <Link
                    href={`/mutual-funds/${fund.id}`}
                    className="grid size-6 place-items-center">
                    <ChevronRight size={20} />
                  </Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MutualFundPage;
