import React from "react";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

interface ILoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}
const LoadingButton = ({
  children,
  isLoading,
  className,
  ...rest
}: ILoadingButtonProps) => {
  return (
    <button
      className={cn(
        "gap-2 rounded-sm  py-2 px-6 flex items-center justify-center",
        className
      )}
      {...rest}
    >
      {children}
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
    </button>
  );
};

export default LoadingButton;
