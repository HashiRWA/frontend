import MarketList from "./_components/MarketList";
import markets from "../../data/markets";
const MarketPage = () => {
  return (
    <main className="py-4">
      <MarketList markets={markets} />
    </main>
  );
};

export default MarketPage;
