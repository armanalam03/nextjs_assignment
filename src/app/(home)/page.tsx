import {
  getAverageDensity,
  getLifeExpectancy,
  getTotalPopulation,
} from "@/lib/apis";
import { formatNumber } from "@/lib/helpers";
import HomeDataComponent from "@/ui/components/HomeDataComponent";
import StatsTile from "@/ui/components/StatsTile";

const Home = async () => {
  const totalPopulation = await getTotalPopulation();
  const densityOverYears = await getAverageDensity();
  const lifeExpectancy = await getLifeExpectancy();

  return (
    <span className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center gap-4 flex-col lg:flex-row">
        <StatsTile
          title="Total Population"
          stats={formatNumber(totalPopulation[1][0].value) || 0}
        />
        <StatsTile title="Total Population" stats={densityOverYears} />
      </div>
      <div className="w-full h-full bg-primary rounded-xl flex items-center justify-center p-12">
        <HomeDataComponent
          data={[
            {
              title: "Total Population",
              stats: formatNumber(totalPopulation[1][0].value) || "0",
            },
            {
              title: "Change in last year",
              stats: `+${
                formatNumber(
                  totalPopulation[1][0].value - totalPopulation[1][1].value
                ) || "0"
              }`,
            },
            {
              title: "Life Expectancy at Birth",
              stats: lifeExpectancy,
            },
          ]}
        />
      </div>
    </span>
  );
};

export default Home;
