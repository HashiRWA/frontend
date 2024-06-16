import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto my-32 w-[70%] rounded-lg bg-white p-4 shadow-2xl">
      <Link
        href="/positions"
        className="mb-2 flex items-center gap-2 text-lg font-medium">
        <ArrowLeft />
      </Link>
      <div className="rounded-md">{children}</div>
    </main>
  );
};
export default Layout;
