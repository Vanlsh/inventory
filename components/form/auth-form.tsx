"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input";
import { cn } from "@/lib/cn";
import { FormType } from "@/lib/constants";
import { authSchema, TAuthSchema } from "@/schemas/auth";
import { registerAction } from "@/actions/auth";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import LoadingButton from "../loading-button";
import { useRouter } from "next/navigation";

const formInputs = [
  { name: "name", title: "Name" },
  { name: "password", title: "Password" },
] as const;

interface IAuthFormProps {
  className?: string;
  type: FormType;
  callbackUrl: string;
}

const AuthForm = ({ className, type, callbackUrl }: IAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const [isPending, submit] = useTransition();

  const router = useRouter();

  const onSubmit = async (values: TAuthSchema) => {
    submit(async () => {
      try {
        if (type === FormType.Register) {
          console.log("register", values);
          const user = await registerAction(values);
          if (user.error) {
            console.log(user.error);
            return;
          }
        }
        await signIn("credentials", { ...values, redirect: false });
        router.push(callbackUrl);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <form
      className={cn("flex flex-col gap-2  w-full", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      {formInputs.map((input) => (
        <div key={input.name}>
          <label>
            {input.title}:
            <Input {...register(input.name)} />
          </label>
          {errors[input.name] && (
            <p className="text-xs text-red-600">
              {errors[input.name]?.message}
            </p>
          )}
        </div>
      ))}
      <LoadingButton
        isLoading={isPending}
        disabled={isPending}
        className="bg-green-400"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default AuthForm;
