import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import getGlobal from "../../hooks/getGlobal";
import {
  AgeData,
  Agegroup,
  PatientsAgeGroupKpiClient,
} from "../../services/KpisService";
import { CACHE_KEY_Agegroup } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";

ChartJS.register(ArcElement, Tooltip, Legend);

const PatientAgeGroupKpi = () => {
  const { data: age, isLoading } = getGlobal(
    {} as AgeData,
    CACHE_KEY_Agegroup,
    PatientsAgeGroupKpiClient,
    { staleTime: 360000 }
  );
  if (isLoading) return <LoadingSpinner />;

  const options = {
    layout: {
      padding: {
        bottom: 2,
      },
    },
  };

  const data = {
    labels: ["0-20", "21-30", "31-40", "41-50", "51-60"],
    datasets: [
      {
        label: "Nombre des patients",

        data: age.map((item: any) => item.count),
        backgroundColor: [
          "#170087",
          "#005dcd",
          "#49dbf2",
          "#e34676",
          "#842cbc",
          "rgba(255, 159, 64, 0.2)",
        ],

        borderColor: [
          "#170087",
          "#005dcd",
          "#49dbf2",
          "#e34676",
          "#842cbc",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};

export default PatientAgeGroupKpi;
