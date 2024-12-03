import { FormType } from "@/lib/constants";
import AuthForm from "./form/auth-form";
import Link from "next/link";

interface IAuth {
  type: FormType;
  title: string;
  href: string;
  linkText: string;
  callbackUrl: string;
}
const Auth = ({ type, title, href, linkText, callbackUrl }: IAuth) => {
  return (
    <div className="max-w-xl w-full rounded-lg bg-white p-10 m-auto ">
      <h2 className="mb-3 uppercase font-bold w-fit mx-auto">{title}</h2>
      <AuthForm type={type} callbackUrl={callbackUrl} />
      <Link
        className="block text-gray-500  transition-transform duration-300  hover:underline w-fit mx-auto mt-2"
        href={href}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default Auth;
