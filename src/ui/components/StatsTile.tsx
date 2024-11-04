import React from "react";
import { cn } from "@/lib/utils";

const StatsTile = ({
  title,
  stats,
  className,
}: {
  title: string | number;
  stats: string | number;
  className?: string;
}) => {
  return (
    <div
      className={cn("bg-primary w-full rounded-xl p-6 space-y-2", className)}
    >
      <p className="text-xs font-bold text-black/50 text-center">{title}</p>
      <p className="text-3xl font-bold text-center">{stats}</p>
    </div>
  );
};

export default StatsTile;
