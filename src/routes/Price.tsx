import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const areaPriceData = data?.map((price) => ({
    x: new Date(price.time_close * 1000),
    y: parseFloat(price.close),
  }));

  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <ApexChart
          type="area"
          series={[
            {
              name: "Price",
              data: areaPriceData ?? [],
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: isDark ? "dark" : "light" },
            grid: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            xaxis: {
              type: "datetime",
              labels: {
                formatter: function (val) {
                  return new Date(val).toLocaleDateString();
                },
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            yaxis: {
              // labels: {
              //   formatter: function (val) {
              //     return `$${val.toFixed(2)}`;
              //   },
              // },
              show: false,
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
              },
            },
            colors: ["#3C90EB"],
          }}
        />
      )}
    </div>
  );
}

export default Price;
