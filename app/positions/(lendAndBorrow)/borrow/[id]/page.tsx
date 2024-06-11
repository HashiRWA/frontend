"use client";
import { positions } from "@/data/positions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const ASSET = 5.2217;
const COLLATERAL = 5.2217;

const BorrowPositionPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const position = positions.find((position) => position.id === Number(id));

  const isMatured = new Date(position?.maturity ?? "") < new Date();

  const handleCloseButton = () => {
    // change the function for the smart contract thingie
    const result = false;
    if (result) {
      toast.success("Closed successfully");
      router.push("/markets");
    } else {
      toast.error("Error Closing");
    }
  };

  return (
    <div className="space-y-4 px-4 py-5">
      <div className="flex justify-between">
        <h1>
          {position?.asset} / {position?.collateral}
        </h1>
        <p className="text-sm">
          {isMatured ? "Matured on" : "Matures on"} {position?.maturity}
        </p>
      </div>
      <div className="flex justify-between rounded-md border-2 p-3">
        <div className="space-y-2 text-sm">
          <span>Amount at Maturity</span>
          <div className="space-x-5 font-semibold">
            <span>
              {ASSET} {position?.asset}
            </span>
            <span className="uppercase">Or</span>
            <span>
              {COLLATERAL} {position?.collateral}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleCloseButton()}
            className="h-full rounded-md bg-blue-200 px-4 font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default BorrowPositionPage;
