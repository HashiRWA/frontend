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
    <div className="flex flex-col gap-3 px-4 pt-7">
      <h2 className="pt-3 text-center text-xl font-bold">Assets Invested</h2>
      <div className="rounded-md border border-emerald-900 text-center">
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
              className="grid grid-cols-2 justify-items-center divide-x divide-emerald-900 border-b border-b-emerald-900">
              <span className="w-full py-[1.3rem]">{asset.position}</span>
              <span className="w-full py-[1.3rem]">{asset.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetsInvestedList;
