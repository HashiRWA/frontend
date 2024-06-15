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
    <div className="grid grid-cols-2 items-center justify-items-center px-10 py-6">
      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-3xl">
          Meet,{" "}
          <span className="text-4xl font-bold text-emerald-900"> {person}</span>
        </h2>
        <div className="justify-self-center">
          <Image
            src={image}
            width={200}
            height={200}
            alt={person}
            className="rounded-full ring-4 ring-emerald-800"
          />
        </div>
        <p className="relative">
          <Quote className="rotate-180" />
          <span className="pl-7 text-sm leading-8">
            {text}
            <span className="absolute bottom-3 ml-2">
              <Quote />
            </span>
          </span>
        </p>
      </div>
      <PieChart investments={investments} />
    </div>
  );
};
export default Profile;
