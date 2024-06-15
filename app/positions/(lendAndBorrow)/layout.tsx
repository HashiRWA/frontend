import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto p-4 my-32 w-[70%]  rounded-lg bg-white ">
      <Link
        href="/positions"
        className="flex items-center gap-2 text-lg font-medium mb-2">
        <ArrowLeft />
      </Link>
      <div className="rounded-md">{children}</div>
    </main>
  );
};
export default Layout;
