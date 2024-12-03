"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLinkProps {
  children: React.ReactNode;
  href: string;
}

const NavLink = ({ children, href }: INavLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);
  return (
    <Link
      className={cn(
        "uppercase relative after:transition-opacity after:duration-300 inline-block transition-colors py-2 after:absolute after:content-[''] after:w-full after:h-1 after:bg-green-500 after:bottom-0 after:left-0 after:rounded-full after:opacity-0",
        {
          "after:opacity-100": isActive,
        }
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
