import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/cn";

export interface IModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  isDescriptionSrOnly?: boolean;
}

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  className,
  isDescriptionSrOnly = true,
}: IModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn("p-0 gap-0 border-t", className)}>
        <DialogHeader className="p-5">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription
            className={cn({ ["sr-only"]: isDescriptionSrOnly })}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
