"use client"

import PositionList from "./_components/PositionList";
import { useContext } from "react";
import { BlockChainContext } from "@/context/BlockChainContext";
import {Position} from "../../types"

function dividePositions(positions: Position[]) {
	const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
  
	const active: Position[] = [];
	const matured: Position[] = [];
  
	positions.forEach(position => {
	  if (position.maturity > currentTimestamp) {
		active.push(position);
	  } else {
		matured.push(position);
	  }
	});
  
	return { active, matured };
}

const PositionsPage = () => {

	const {positions,loading} = useContext(BlockChainContext)
	const {active,matured} = dividePositions(positions)

	return (
		<div className="mx-auto py-4  my-28 w-[90%] flex flex-col items-center  rounded-lg bg-white ">
			{loading&&<div className="loader"></div>}

			<div className="space-y-8 w-full px-4">
				<PositionList title="Active" positions={active} />
				<PositionList title="Matured" positions={matured} />
			</div>
		</div>
	);
};
export default PositionsPage;
