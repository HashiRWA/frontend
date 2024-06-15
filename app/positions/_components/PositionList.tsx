import { Position } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PositionListProps {
  title: string;
  positions: Position[];
}

const PositionList = ({ title, positions }: PositionListProps) => {

  const bgVariants = {
    "Lend":"bg-emerald-700",
    "Borrow":"bg-teal-800",
  }

  console.log(positions)

  return (
    <div className="rounded-md w-full  text-[#374950]">


      <h3 className="p-3 font-bold">{title}</h3>

      <div className="flex w-full gap-11 border-b-2 border-dashed pl-4 pr-12 text-sm font-medium uppercase justify-between">
        <div className="flex gap-11">
          <span>Type</span>
          <span >Pools(Assets / collateral)</span>
        </div>
        <span >Maturity</span>
      </div>


      <div className="divide-y py-2 flex flex-col gap-2 mt-2">
        {positions?.map((position,index) => (
          <Link 
            key={index}
            className="cursor-pointer"
            href={`/positions/${position.type.toLocaleLowerCase()}/${position?.id}`}
          >

            <div  className="flex items-center justify-between gap-4 p-2  border border-emerald-800 rounded-md ">


              <span className={`w-[6%] text-white rounded-md px-2  ${bgVariants[position?.type?.toString() as "Lend"|"Borrow"]}`}>
                {position.type}
              </span>



              <div className="flex-1 space-x-2 divide-x-2">
                <span>
                  {position?.asset?.substring(0,10)} / {position.collateral?.substring(0,10)}
                </span>
                <span className="px-3 text-xs font-medium">
                  SP: {""}
                  <span className="text-xs">
                    {position?.strikeprice} {position.collateral?.substring(0,10)} / {position.asset?.substring(0,10)}
                  </span>
                </span>
              </div>


              <span className="text-sm font-semibold">{new Date(position?.maturity * 1000).toLocaleDateString()}</span>


              <div className="grid size-5 place-items-center">
                <ChevronRight size={15} />
              </div>

            </div>


          </Link>
        ))}
      </div>
    </div>
  );
};
export default PositionList;
