import { DROPDOWN_DATA_OPTIONS } from "./constants";
import { filterInvalidData } from "./helpers";

export const getTotalPopulation = async () => {
  const totalPopulation = await fetch(
    "https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?format=json",
    { cache: "force-cache" }
  );
  const totalPopulationData = await totalPopulation.json();
  return totalPopulationData;
};

export const getAverageDensity = async () => {
  const densityOverYears = await fetch(
    "https://api.worldbank.org/v2/country/WLD/indicator/EN.POP.DNST?format=json&per_page=100",
    { cache: "force-cache" }
  );
  const densityOverYearsData = await densityOverYears.json();

  const filteredDensityData = filterInvalidData(densityOverYearsData);

  const averageDensity = Math.round(
    filteredDensityData.reduce((acc: number, curr: { value: number }) => {
      return acc + curr.value;
    }, 0) / filteredDensityData.length
  );

  return `${averageDensity} p/sqkm`;
};

export const getLifeExpectancy = async () => {
  const lifeExpectancy = await fetch(
    "https://api.worldbank.org/v2/country/WLD/indicator/SP.DYN.LE00.IN?format=json&per_page=10",
    { cache: "force-cache" }
  );

  const lifeExpectancyData = filterInvalidData(await lifeExpectancy.json());
  return `${Math.round(lifeExpectancyData[0].value) || "0"} Yrs`;
};

export const getPopulationBetweenYears = async ({
  fromYear,
  toYear,
}: {
  fromYear: number | string;
  toYear: number | string;
}) => {
  fromYear = typeof fromYear === "number" ? fromYear.toString() : fromYear;
  toYear = typeof toYear === "number" ? toYear.toString() : toYear;

  if (fromYear > toYear) {
    [fromYear, toYear] = [toYear, fromYear];
  }

  const populationBetweenYears = await fetch(
    `https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?date=${fromYear}:${toYear}&format=json&per_page=100`,
    { cache: "force-cache" }
  );

  const populationBetweenYearsData = await populationBetweenYears.json();
  return populationBetweenYearsData[1];
};

export const getCountriesPopulation = async () => {
  const countriesPopulation = await fetch(
    "https://api.worldbank.org/v2/country/IND;CHN;USA;IDN;PAK/indicator/SP.POP.TOTL?date=2018:2023&format=json",
    { cache: "force-cache" }
  );

  const countriesPopulationData = await countriesPopulation.json();
  return countriesPopulationData[1];
};

export const getChartData = async ({
  indicator,
  date,
}: {
  indicator: string | number;
  date: string | number;
}) => {
  const [chartData, coutriesData] = await Promise.all([
    fetch(
      `https://api.worldbank.org/v2/country/WLD/indicator/${indicator}?date=${date}&format=json&per_page=500`,
      { cache: "force-cache" }
    ).then((res) => res.json()),
    fetch(
      `https://api.worldbank.org/v2/country/IND;CHN;USA;IDN;PAK/indicator/${indicator}?date=${date}&format=json&per_page=500`,
      { cache: "force-cache" }
    ).then((res) => res.json()),
  ]);

  const res = {
    chartData: chartData[1],
    coutriesData: coutriesData[1],
  };

  return Promise.resolve(res);
};

export const getTableData = async (year: number | string) => {
  const tableData = await Promise.all(
    DROPDOWN_DATA_OPTIONS.map(async (option) => {
      const data = await fetch(
        `https://api.worldbank.org/v2/country/IND;CHN;USA;IDN;PAK/indicator/${option.value}?date=${year}&format=json&per_page=100`,
        { cache: "force-cache" }
      );
      const dataJson = await data.json();
      return dataJson[1];
    })
  );
  return tableData;
};
