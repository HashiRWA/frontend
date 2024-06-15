import mutualFunds from "@/data/mutualFunds";
import Link from "next/link";

const MutualFundPage = () => {
  return (
    <div className="mx-auto mb-4 mt-28 w-[90%] text-[#374950]">
      <div className="rounded-lg bg-white px-4 py-4 text-[14px]">
        <div className="text-md grid grid-cols-3 justify-items-center gap-20 px-4 py-2 font-extrabold">
          <span className="justify-self-start">Mutual Fund</span>
          <span>Return Rate</span>
          <span className="justify-self-end pr-8">% Stable by RWA</span>
        </div>
        <div className="space-y-6 py-5">
          {mutualFunds.map((fund) => (
            <Link
              href={`/mutual-funds/${fund.id}`}
              className="grid grid-cols-3 items-center justify-items-center gap-14 rounded-md border border-emerald-800 p-4 transition-all duration-150 ease-in-out hover:bg-slate-200"
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
                  <span className="rounded-lg bg-emerald-800 p-2 text-xs font-medium text-white">
                    stable by RWA
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MutualFundPage;
