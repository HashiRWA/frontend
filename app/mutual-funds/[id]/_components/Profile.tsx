import Image from "next/image";
import { Quote } from "lucide-react";
import PieChart from "@/components/PieChart";

interface Investment {
  type: string;
  percentage: number;
}

interface Details {
  person: string;
  image: string;
  text: string;
}

interface ProfileProps {
  details: Details[] | undefined;
  investments: Investment[] | undefined;
}

const Profile = ({ details, investments }: ProfileProps) => {
  if (!details || details.length === 0) {
    return <div>No details available</div>;
  }
  const { person, image, text } = details[0];

  return (
    <div className="flex h-max items-center justify-center gap-5">
      <div className="grid h-full w-full grid-cols-1 gap-6 rounded-lg bg-white px-10 py-11 shadow-xl">
        <div className="justify-self-start">
          <Image
            src={image}
            width={150}
            height={150}
            alt={person}
            className="rounded-full ring-4 ring-emerald-800"
          />
        </div>
        <h2 className="text-3xl">
          <span className="text-4xl font-bold text-emerald-900"> {person}</span>
        </h2>
        <p className="relative w-[70%] text-sm">{text}</p>
      </div>
      <PieChart investments={investments} />
    </div>
  );
};
export default Profile;
