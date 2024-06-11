import { Position } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PositionListProps {
  title: string;
  positions: Position[];
}

const PositionList = ({ title, positions }: PositionListProps) => {
  return (
    <div className="rounded-md border-2">
      <h3 className="p-3 font-bold">{title}</h3>
      <div className="flex gap-11 border-b-2 pl-4 pr-12 text-[14.5px] font-semibold uppercase">
        <span>Type</span>
        <span className="w-3/4">Pools(Assets / collateral)</span>
        <span>Maturity</span>
      </div>
      <div className="divide-y py-2">
        {positions.map((position, index) => (
          <div key={index} className="px-2 py-1.5">
            <div className="flex items-center justify-between gap-4">
              <span className="w-[10%] rounded-full border-2 text-center font-medium">
                {position.type}
              </span>
              <div className="flex-1 space-x-2 divide-x-2">
                <span>
                  {position.asset} / {position.collateral}
                </span>
                <span className="px-3 text-xs font-medium">
                  TP: {""}
                  <span className="text-xs">
                    {position.tp} {position.collateral} / {position.asset}
                  </span>
                </span>
              </div>
              <span className="text-sm">{position.maturity}</span>
              <Link
                href={`/positions/${position.type.toLocaleLowerCase()}/${position.id}`}
                className="grid size-5 place-items-center">
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PositionList;
