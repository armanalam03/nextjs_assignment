"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { CHART_DATA, CHART_OPTIONS } from "@/lib/constants";
import { getChartData } from "@/lib/apis";
import { formatNumber } from "@/lib/helpers";
import type { CountryDataType, DropdownOptionType } from "@/lib/types";

const DataLineChart = ({
  selectedDataOption,
  selectedTimeRangeOption,
}: {
  selectedDataOption: DropdownOptionType;
  selectedTimeRangeOption: DropdownOptionType;
}) => {
  const [chartData, setChartData] = useState(Array(6).fill(0));
  const [countriesLabelData, setCountriesLabelData] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const handleChartData = async () => {
    const data = await getChartData({
      indicator: selectedDataOption.value,
      date: `${2023 - Number(selectedTimeRangeOption.value)}:2023`,
    });
    const chartParsedData = data.chartData.map(
      (data: { value: number }) => data.value || 0
    );
    setChartData(chartParsedData);
    const countriesParsedLabelData = data.coutriesData.map(
      (countryData: CountryDataType) => {
        return {
          title: countryData.country.value,
          value: formatNumber(countryData.value),
          date: countryData.date,
        };
      }
    );
    setCountriesLabelData(countriesParsedLabelData);
  };

  useEffect(() => {
    handleChartData();
  }, [selectedDataOption, selectedTimeRangeOption]);

  const data = {
    ...CHART_DATA,
    labels: Array(selectedTimeRangeOption.value)
      .fill(0)
      .map((_, i) => 2023 - i),
    datasets: [
      {
        ...CHART_DATA.datasets[0],
        data: chartData,
        labelsData: countriesLabelData,
      },
    ],
  };

  return (
    <div className="w-full h-64 pb-10">
      {/* @ts-expect-error types unmatched */}
      <Line options={CHART_OPTIONS} data={data} />
    </div>
  );
};

export default DataLineChart;
