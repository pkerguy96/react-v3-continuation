import { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import getGlobal from "../../hooks/getGlobal";
import { PatientsReferralClient } from "../../services/KpisService";
import { CACHE_KEY_PatientReferral } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";

const generateUniqueColors = (count: number) => {
  const colors = new Set<string>();
  while (colors.size < count) {
    const color = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    colors.add(color);
  }
  return Array.from(colors);
};

const ReferralPatient = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const { data: referal = {}, isLoading } = getGlobal(
    {} as any,
    CACHE_KEY_PatientReferral,
    PatientsReferralClient,
    { staleTime: 360000 }
  );

  const chartColors = useMemo(() => {
    return generateUniqueColors(Object.keys(referal || {}).length);
  }, [referal]);

  useEffect(() => {
    if (!referal || Object.keys(referal).length === 0) {
      if (data.labels.length !== 0 || data.datasets.length !== 0) {
        setData({
          labels: [],
          datasets: [],
        });
      }
      return;
    }

    const chartData = {
      labels: Object.keys(referal),
      datasets: [
        {
          label: "Nombre",
          data: Object.values(referal),
          backgroundColor: chartColors,
          borderColor: chartColors,
          borderWidth: 1,
        },
      ],
    };

    // Only update state if data changes
    if (
      JSON.stringify(data.labels) !== JSON.stringify(chartData.labels) ||
      JSON.stringify(data.datasets) !== JSON.stringify(chartData.datasets)
    ) {
      setData(chartData);
    }
  }, [referal, chartColors, data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Doughnut data={data} options={{ layout: { padding: { bottom: 2 } } }} />
  );
};

export default ReferralPatient;
