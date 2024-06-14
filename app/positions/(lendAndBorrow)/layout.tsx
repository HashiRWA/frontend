import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto p-4   my-28 w-[90%]  rounded-lg bg-white ">
      <Link
        href="/positions"
        className="flex items-center gap-2 text-lg font-medium">
        <ArrowLeft />
        Back to Positions
      </Link>
      <div className="rounded-md border-2">{children}</div>
    </main>
  );
};
export default Layout;
