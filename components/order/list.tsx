import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

interface IList {
  children: React.ReactNode;
  fullWidth: boolean;
}

export const List = ({ children, fullWidth }: IList) => {
  return (
    <motion.ul
      className={cn("flex flex-col gap-4 w-full min-w-96")}
      initial={false}
      animate={{
        width: fullWidth ? "100%" : "40%",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.ul>
  );
};

interface IListItem {
  children: React.ReactNode;
  fullWidth: boolean;
  onClick: () => void;
}

export const ListItem = ({ children, fullWidth, onClick }: IListItem) => {
  return (
    <motion.li
      onClick={onClick}
      className={cn(
        "cursor-pointer text-sm relative grid items-center gap-4 p-4 border rounded-md shadow-sm  transition-shadow duration-300  hover:shadow-md",
        fullWidth
          ? "grid-cols-[4fr_1fr_2fr_1fr_auto]"
          : "grid-cols-[1fr_1fr_1fr] pr-16"
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.li>
  );
};
