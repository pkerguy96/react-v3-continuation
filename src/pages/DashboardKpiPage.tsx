//@ts-nocheck
import { Box } from "@mui/material";
import RevenueKpi from "../components/Kpis/RevenueKpi";
import TotalAppointmentsKpi from "../components/Kpis/TotalAppointmentsKpi";
import CanceledAppointmentsKpi from "../components/Kpis/CanceledAppointmentsKpi";
import PatientAgeGroupKpi from "../components/Kpis/PatientAgeGroupKpi";
import TotalpatientsKpi from "../components/Kpis/TotalpatientsKpi";
import AppointmentsTableKpi from "../components/Kpis/AppointmentsTableKpi";
import CashierKpi from "../components/Kpis/CashierKpi";
import LinechartKPI from "../components/Kpis/LinechartKPI";

// Sample mock data for charts
const labels = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"];
const appointmentData = [30, 45, 55, 40, 60, 70];
const canceledData = [0, 0, 0, 0, 0, 0];
const ageGroups = [
  { label: "0-20", count: 120 },
  { label: "21-30", count: 150 },
  { label: "31-40", count: 200 },
  { label: "41-50", count: 180 },
  { label: "51-60", count: 110 },
];

const DashboardKpiPage = () => {
  const appointmentDataset = {
    labels,
    datasets: [
      {
        label: "Rendez-vous",
        data: appointmentData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const canceledDataset = {
    labels,
    datasets: [
      {
        label: "Rendez-vous annulés",
        data: canceledData,
        borderColor: "#db2777",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-12 gap-6">
        <Box className="!w-full shadow-md lg:col-span-4 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 text-gray-950 ">
          <CashierKpi />
        </Box>
        <Box className="!w-full shadow-md text-white bg-[#6b37e7] lg:col-span-4">
          <TotalAppointmentsKpi />
          <LinechartKPI dataset={appointmentDataset} />
        </Box>
        <Box className="!w-full shadow-md bg-[#eff0f1] text-gray-950 lg:col-span-4 ">
          <CanceledAppointmentsKpi />
          <LinechartKPI dataset={canceledDataset} />
        </Box>
      </div>

      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="flex flex-col gap-6 lg:col-span-9">
          <Box className="!w-full shadow-md bg-[#eff0f1] text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Graphique des revenus</h1>
            <RevenueKpi />
          </Box>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Box className="!w-full shadow-md bg-[#eff0f1] text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">
              Groupe d’âge des patients
            </h1>
            <PatientAgeGroupKpi ageData={ageGroups} />
          </Box>
          <Box className="w-full shadow-md bg-[#eff0f1] text-gray-950 flex flex-col">
            <TotalpatientsKpi />
          </Box>
        </div>
      </div>
      <Box className="Flex w-full ">
        <Box className="w-full shadow-md bg-[#eff0f1] text-gray-950 flex flex-col">
          <h1 className="text-xl font-semibold p-6">
            Dernière activité en salle d'attente
          </h1>
          <AppointmentsTableKpi />
        </Box>
      </Box>
      <Box className="flex w-full "></Box>
    </div>
  );
};

export default DashboardKpiPage;
