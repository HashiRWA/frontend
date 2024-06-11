import { Position } from "@/types";
import PositionList from "./_components/PositionList";
import { positions } from "@/data/positions";

const PositionsPage = () => {
  const getActiveAndMaturedPositions = (positions: Position[]) => {
    const activePositions: Position[] = [];
    const maturedPositions: Position[] = [];
    const now = new Date();

    positions.forEach((position) => {
      const maturityDate = new Date(position.maturity);
      if (maturityDate >= now) {
        activePositions.push(position);
      } else {
        maturedPositions.push(position);
      }
    });

    return { activePositions, maturedPositions };
  };

  const { activePositions, maturedPositions } = getActiveAndMaturedPositions(positions);

  return (
    <div className="max-w-[45rem] mx-auto py-4">
      <h1 className="font-bold text-xl pb-3">My Positions</h1>
      <div className="space-y-8">
        <PositionList title="Active Positions" positions={activePositions} />
        <PositionList title="Matured Positions" positions={maturedPositions} />
      </div>
    </div>
  );
};
export default PositionsPage;
