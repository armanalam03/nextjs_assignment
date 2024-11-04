"use client";

import React, { useState } from "react";
import PopulationTableSection from "@/ui/components/PopulationTableSection";
import {
  DROPDOWN_DATA_OPTIONS,
  DROPDOWN_TIME_RANGE_OPTIONS,
} from "@/lib/constants";
import DropDown from "@/ui/components/common/DropDown";
import type { DropdownOptionType } from "@/lib/types";
import DataLineChart from "@/ui/components/DataLineChart";

const Page = () => {
  const [selectedDataOption, setSelectedDataOption] =
    useState<DropdownOptionType>(DROPDOWN_DATA_OPTIONS[0]);
  const [isDataPopoverOpen, setIsDataPopoverOpen] = useState(false);
  const [selectedTimeRangeOption, setSelectedTimeRangeOption] =
    useState<DropdownOptionType>(DROPDOWN_TIME_RANGE_OPTIONS[0]);
  const [isTimeRangePopoverOpen, setIsTimeRangePopoverOpen] = useState(false);

  const handleDataPopOverOpenChange = (open: boolean) => {
    setIsDataPopoverOpen(open);
  };

  const handleTimeRangePopoverOpenChange = (open: boolean) => {
    setIsTimeRangePopoverOpen(open);
  };

  return (
    <div className="w-full h-full rounded-xl bg-primary py-4 px-12 relative overflow-y-auto">
      {/* Chart Section */}
      <div className="flex items-center justify-between">
        <DropDown
          open={isDataPopoverOpen}
          onOpenChange={handleDataPopOverOpenChange}
          selectedOption={selectedDataOption}
          setSelectedOption={setSelectedDataOption}
          dropdownOptions={DROPDOWN_DATA_OPTIONS}
        />
        <DropDown
          open={isTimeRangePopoverOpen}
          onOpenChange={handleTimeRangePopoverOpenChange}
          selectedOption={selectedTimeRangeOption}
          setSelectedOption={setSelectedTimeRangeOption}
          dropdownOptions={DROPDOWN_TIME_RANGE_OPTIONS}
        />
      </div>
      <div className="p-10 border-b border-gray-300">
        <DataLineChart
          selectedDataOption={selectedDataOption}
          selectedTimeRangeOption={selectedTimeRangeOption}
        />
      </div>
      {/* Table Section */}
      <PopulationTableSection />
    </div>
  );
};

export default Page;
