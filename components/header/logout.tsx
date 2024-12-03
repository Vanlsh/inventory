import { cn } from "@/lib/cn";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface ILogoutProps {
  className?: string;
}
const Logout = ({ className }: ILogoutProps) => {
  return (
    <button
      className={cn(
        "flex gap-2 items-center text-sm px-4 py-2 rounded-md text-white bg-green-400 transition-opacity duration-300 hover:opacity-80",
        className
      )}
      onClick={() => signOut()}
    >
      <LogOut size={16} /> Logout
    </button>
  );
};

export default Logout;
