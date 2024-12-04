import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import getGlobal from "../../hooks/getGlobal";
import { Revenue, TotalRevenueKpiClient } from "../../services/KpisService";
import { CACHE_KEY_RevenueKpi } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const RevenueKpi = () => {
  const { data: newdata, isLoading } = getGlobal(
    {} as Revenue,
    CACHE_KEY_RevenueKpi,
    TotalRevenueKpiClient,
    {
      staleTime: 3600000, // 1 hour
    }
  );

  if (isLoading) return <LoadingSpinner />;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = newdata ? Object.keys(newdata[0]) : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Le mois dernier",
        data: newdata ? Object.values(newdata[0]) : [],
        backgroundColor: "#015093",
      },
      {
        label: "Le mois en cours",
        data: newdata ? Object.values(newdata[1]) : [],
        backgroundColor: "#528f8a",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default RevenueKpi;
