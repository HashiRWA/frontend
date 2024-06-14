import mutualFunds from "@/data/mutualFunds";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const MutualFundPage = () => {
  return (
    <div className="mx-auto mb-4 mt-28 w-[90%]">
      <div className="rounded-lg bg-white px-4 py-4 text-[14px]">
        <div className="*: grid grid-cols-3 justify-items-center gap-20 border-b border-b-zinc-400 px-4 py-2 text-sm font-medium uppercase">
          <span className="justify-self-start">Mutual Fund</span>
          <span>Return Rate</span>
          <span className="justify-self-end pr-8">% Stable by RWA</span>
        </div>
        <div className="space-y-6 py-5">
          {mutualFunds.map((fund) => (
            <div
              className="grid grid-cols-3 items-center justify-items-center gap-14 rounded-md border p-4"
              key={fund.id}>
              <div className="justify-self-start">
                <span>{fund.name}</span>
              </div>
              <div>
                <span>{fund.rate}%</span>
              </div>
              <div className="justify-self-end">
                <span className="flex items-center justify-end gap-3">
                  {fund.stabilityByRWA}%{" "}
                  <span className="text-xs text-zinc-600">stable by RWA</span>
                  <Link
                    href={`/mutual-funds/${fund.id}`}
                    className="group grid size-6 place-items-center">
                    <ChevronRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
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
