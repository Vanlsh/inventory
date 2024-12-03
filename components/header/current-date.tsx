"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";

interface ICurrentDateProps {
  className?: string;
}
const CurrentDate = ({ className }: ICurrentDateProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("text-sm", className)}>
      <p>Today</p>
      <div className="flex items-center gap-2">
        <span className="uppercase">{format(currentTime, "dd MMM, yyyy")}</span>
        <Clock size={16} className="text-green-400" />
        <span>{format(currentTime, "HH:mm")}</span>
      </div>
    </div>
  );
};

export default CurrentDate;
