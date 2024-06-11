import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto max-w-[45rem] space-y-5 py-4">
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
