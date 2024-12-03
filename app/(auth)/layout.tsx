import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

interface IAuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = async ({ children }: IAuthLayoutProps) => {
  const session = await auth();

  if (session) redirect("/product");

  return <main className="flex h-full items-center">{children}</main>;
};

export default AuthLayout;
