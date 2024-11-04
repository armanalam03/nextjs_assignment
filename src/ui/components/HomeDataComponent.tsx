import React from "react";
import HomeLineChart from "./HomeLineChart";
import type { HomeDataComponentProps } from "@/lib/types";
import ViewMoreButton from "./ViewMoreButton";

const HomeDataComponent: React.FC<HomeDataComponentProps> = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-center justify-between gap-12 border-b border-gray-300 pb-6 lg:flex-row lg:items-end">
      <div className="flex flex-row flex-wrap gap-6 lg:flex-col lg:flex-nowrap">
        {data.map((item) => (
          <div className="flex flex-col items-start gap-1" key={item.title}>
            <span className="text-xs font-bold text-black/50 text-center whitespace-nowrap">
              {item.title}
            </span>
            <span className="text-3xl font-bold text-center whitespace-nowrap">
              {item.stats}
            </span>
          </div>
        ))}
        <ViewMoreButton />
      </div>
      <HomeLineChart />
    </div>
  );
};

export default HomeDataComponent;
