"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

interface ICardProps {
  children: React.ReactNode;
  className: string;
}

const Card = ({ children, className }: ICardProps) => {
  return (
    <motion.div
      className={cn("relative items-center border rounded-md p-4", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
