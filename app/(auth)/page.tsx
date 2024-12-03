import Auth from "@/components/auth";
import { FormType } from "@/lib/constants";

interface IHomeProps {
  searchParams: {
    callbackUrl?: string;
  };
}
export default async function Home({ searchParams }: IHomeProps) {
  const callbackUrl = searchParams.callbackUrl || "/order";
  return (
    <Auth
      title="Login"
      href="/register"
      linkText="I don't have an account"
      type={FormType.Login}
      callbackUrl={callbackUrl}
    />
  );
}
