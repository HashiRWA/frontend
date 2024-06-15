interface AssetsInvested {
  position: string;
  amount: number;
}

interface AssetsInvestedProps {
  assetsInvested: AssetsInvested[] | undefined;
}

const ListHeadings = ["Position", "Amount"];

const AssetsInvestedList = ({ assetsInvested }: AssetsInvestedProps) => {
  return (
    <div className="flex flex-col px-3 gap-3 self-end h-fill">

      
      <div className="rounded-md border border-emerald-900 text-center h-full ">

        <div className="grid grid-cols-2 justify-items-center bg-teal-900 text-lg font-medium text-white">
          {ListHeadings.map((heading, index) => (
            <span key={index} className="w-full py-2">
              {heading}
            </span>
          ))}
        </div>


        <div>
          {assetsInvested?.map((asset, index) => (
            <div
              key={index}
              className="grid grid-cols-2 rounded-b-lg items-center border-t border-t-emerald-900 text-sm">
              <span className="w-full py-3">{asset.position}</span>
              <span className="w-full py-3">{asset.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetsInvestedList;
