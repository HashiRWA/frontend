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
    <div className="flex flex-col gap-5">
      <h2 className="pt-3 text-center text-xl font-bold">Assets Invested</h2>
      <div className="rounded-md border-2 text-center">
        <div className="grid grid-cols-2 justify-items-center divide-x-2 divide-zinc-400 border-b-2 border-b-zinc-400 text-lg font-medium">
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
              className="grid grid-cols-2 justify-items-center divide-x-2 divide-zinc-400 border-b">
              <span className="w-full py-6">{asset.position}</span>
              <span className="w-full py-6">{asset.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetsInvestedList;
