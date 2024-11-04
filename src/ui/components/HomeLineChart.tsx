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
import { getCountriesPopulation, getPopulationBetweenYears } from "@/lib/apis";
import { formatNumber } from "@/lib/helpers";
import type { CountryDataType } from "@/lib/types";

const HomeLineChart = () => {
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

  const populationChartData = async () => {
    const populationData = await getPopulationBetweenYears({
      fromYear: 2018,
      toYear: 2023,
    });
    const chartData = populationData.map(
      (data: { value: number }) => data.value || 0
    );
    setChartData(chartData);
  };

  const countriesData = async () => {
    const data = await getCountriesPopulation();
    const parsedData = data.map((countryData: CountryDataType) => {
      return {
        title: countryData.country.value,
        value: formatNumber(countryData.value),
        date: countryData.date,
      };
    });
    setCountriesLabelData(parsedData);
  };

  useEffect(() => {
    populationChartData();
    countriesData();
  }, []);

  const data = {
    ...CHART_DATA,
    labels: Array(6)
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

export default HomeLineChart;
