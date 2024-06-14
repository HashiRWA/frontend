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
    <div className="grid grid-cols-2 rounded-md border-2 p-10">
      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-3xl">
          Meet, <span className="text-4xl font-bold"> {person}</span>
        </h2>
        <div className="justify-self-center">
          <Image
            src={image}
            width={250}
            height={250}
            alt={person}
            className="rounded-full"
          />
        </div>
        <p className="relative">
          <Quote className="rotate-180" />
          <span className="pl-8 leading-8">{text}</span>
          <Quote className="absolute bottom-4 right-0" />
        </p>
      </div>
      <PieChart investments={investments} />
    </div>
  );
};
export default Profile;
