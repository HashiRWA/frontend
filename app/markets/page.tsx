import MarketList from "./_components/MarketList";
import markets from "../../data/markets";

const MarketPage = () => {
  return (
    <main className="py-4 mt-24 w-full">
      <MarketList markets={markets} />
    </main>
  );
};

export default MarketPage;
