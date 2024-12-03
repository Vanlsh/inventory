import { cn } from "@/lib/cn";
import React from "react";

interface ILoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const RoundedButton = ({
  children,
  className,
  ...rest
}: ILoadingButtonProps) => {
  return (
    <button
      className={cn(
        "text-gray-400 h-10 w-10 flex items-center justify-center rounded-full  transition-colors duration-300  hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
