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
  /*   const { data: newdata, isLoading } = getGlobal(
    {} as Revenue,
    CACHE_KEY_RevenueKpi,
    TotalRevenueKpiClient,
    {
      staleTime: 3600000, // 1 hour
    }
  );

  if (isLoading) return <LoadingSpinner />; */

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const newdata = [
    {
      January: 15000,
      February: 18000,
      March: 17000,
      April: 20000,
      May: 22000,
    },
    {
      January: 16000,
      February: 19000,
      March: 17500,
      April: 21000,
      May: 23000,
    },
  ];
  const labels = newdata ? Object.keys(newdata[0]) : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Le mois dernier",
        data: newdata ? Object.values(newdata[0]) : [],
        backgroundColor: "#f2edfd",
      },
      {
        label: "Le mois en cours",
        data: newdata ? Object.values(newdata[1]) : [],
        backgroundColor: "#6b37e7",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default RevenueKpi;
