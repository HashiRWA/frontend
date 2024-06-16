import Loader from "@/components/Loader";
import { getTokenDetails } from "@/constants";
import { Position } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PositionListProps {
  title: string;
  positions: Position[];
  loading: boolean;
}

const PositionList = ({ title, positions, loading }: PositionListProps) => {
  const bgVariants = {
    Lend: "bg-emerald-700",
    Borrow: "bg-teal-800",
  };

  console.log(positions);

  return (
    <div className="w-full rounded-md text-[#374950]">
      <h3 className="p-3 font-bold">{title}</h3>

      <div className="flex w-full justify-between gap-11 border-b-2 border-dashed pl-4 pr-12 text-sm font-medium uppercase">
        <div className="flex gap-11">
          <span>Type</span>
          <span>Pools(Assets / collateral)</span>
        </div>
        <span>Maturity</span>
      </div>

      <div className="mt-2 flex flex-col gap-2 divide-y py-2">
        {loading ? (
          <Loader />
        ) : (
          positions?.map((position, index) => (
            <Link
              key={index}
              className="cursor-pointer"
              href={`/positions/${position.type.toLocaleLowerCase()}/${position?.id}`}>
              <div className="flex items-center justify-between gap-4 rounded-md border border-emerald-800 p-2 transition hover:bg-[#c5e4e7]/60">
                <span
                  className={`w-[6%] rounded-md px-2 text-white ${bgVariants[position?.type?.toString() as "Lend" | "Borrow"]}`}>
                  {position.type}
                </span>

                <div className="flex-1 space-x-2 divide-x-2">
                  <span>
                  {position?.name} {getTokenDetails(position.asset)?.symbol} / {getTokenDetails(position.collateral)?.symbol}
                  </span>
                  <span className="px-3 text-xs font-medium">
                    SP: {""}
                    <span className="text-xs">
                      {position?.strikeprice}{" "}
                      {getTokenDetails(position.asset)?.symbol} / {getTokenDetails(position.collateral)?.symbol}
                    </span>
                  </span>
                </div>

                <span className="text-sm font-semibold">
                  {new Date(position?.maturity * 1000).toLocaleDateString()}
                </span>

                <div className="grid size-5 place-items-center">
                  <ChevronRight size={15} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
export default PositionList;
