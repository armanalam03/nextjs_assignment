"use client";

import React, { useEffect, useState } from "react";
import DropDown from "./common/DropDown";
import { DROPDOWN_DATA_OPTIONS, DROPDOWN_YEARS } from "@/lib/constants";
import type { DropdownOptionType, TableDataItem } from "@/lib/types";
import { getTableData } from "@/lib/apis";
import { formatNumber } from "@/lib/helpers";

const PopulationTableSection = () => {
  const [selectedYear, setSelectedYear] = useState<DropdownOptionType>(
    DROPDOWN_YEARS[0]
  );
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [tableData, setTableData] = useState<TableDataItem[][]>([]);

  const handlePopOverOpenChange = (isOpen: boolean) => {
    setIsPopOverOpen(isOpen);
  };

  const handleTableData = async () => {
    const data = await getTableData(selectedYear.value);
    setTableData(data);
  };

  useEffect(() => {
    handleTableData();
  }, [selectedYear]);

  return (
    <div className="w-full flex flex-col items-end py-6 gap-8">
      <DropDown
        open={isPopOverOpen}
        onOpenChange={handlePopOverOpenChange}
        selectedOption={selectedYear}
        setSelectedOption={setSelectedYear}
        dropdownOptions={DROPDOWN_YEARS}
      />
      <table className="min-w-full text-center text-sm">
        <thead>
          <tr className="border-b border-gray-300">
            <TableHead value="Country" />
            {DROPDOWN_DATA_OPTIONS.map((option) => (
              <TableHead value={option.title} key={option.title} />
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {["China", "Indonesia", "India", "Pakistan", "United States"].map(
            (country) => (
              <tr
                key={country}
                className="border-b border-gray-300 last:border-b-0"
              >
                <TableData value={country} />
                {Array.from(
                  { length: DROPDOWN_DATA_OPTIONS.length },
                  (_, index) => (
                    <TableData
                      value={
                        formatNumber(
                          tableData[index]?.find(
                            (data) => data.country.value === country
                          )?.value
                        ) || "-"
                      }
                      key={index}
                    />
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PopulationTableSection;

const TableHead = ({ value }: { value: string }) => {
  return (
    <th className="px-4 py-2 border-r border-gray-300 font-medium text-gray-500 text-xs last:border-r-0">
      {value}
    </th>
  );
};

const TableData = ({ value }: { value: string }) => {
  return (
    <td className="px-4 py-2 border-r border-gray-300 text-gray-400 text-xs last:border-r-0">
      {value}
    </td>
  );
};
