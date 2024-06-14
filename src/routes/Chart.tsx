import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

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

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const candlestickData = data?.map((price) => ({
    x: new Date(price.time_close * 1000),
    y: [
      parseFloat(price.open),
      parseFloat(price.high),
      parseFloat(price.low),
      parseFloat(price.close),
    ],
  }));

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: candlestickData ?? [],
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
              show: false,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "lightcoral",
                },
              },
            },
            tooltip: {
              shared: true,
              intersect: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
