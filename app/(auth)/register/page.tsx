import { FormType } from "@/lib/constants";
import Auth from "@/components/auth";

interface IRegisterPageProps {
  searchParams: {
    callbackUrl?: string;
  };
}

const RegisterPage = ({ searchParams }: IRegisterPageProps) => {
  const callbackUrl = searchParams.callbackUrl || "/order";
  return (
    <Auth
      title="Register"
      href="/"
      linkText="I already have an account"
      type={FormType.Register}
      callbackUrl={callbackUrl}
    />
  );
};

export default RegisterPage;
