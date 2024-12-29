import Link from "next/link";
import { Anton } from "next/font/google";
import { cn } from "@/lib/utils";

const fontBrand = Anton({
  weight: ["400"],
  subsets: ["latin"],
});
export const Logo = () => {
  return (
    <Link
      href="/"
      className={cn("tracking-2 text-3xl text-primary", fontBrand.className)}
    >
      Cord<span className="text-4xl text-fuchsia-400">X</span>plorer
    </Link>
  );
};
