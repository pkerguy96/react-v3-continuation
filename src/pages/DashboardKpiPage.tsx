import { Box } from "@mui/material";
import RevenueKpi from "../components/Kpis/RevenueKpi";
import TotalAppointmentsKpi from "../components/Kpis/TotalAppointmentsKpi";
import CanceledAppointmentsKpi from "../components/Kpis/CanceledAppointmentsKpi";
import PatientAgeGroupKpi from "../components/Kpis/PatientAgeGroupKpi";
import TotalpatientsKpi from "../components/Kpis/TotalpatientsKpi";
import AppointmentsTableKpi from "../components/Kpis/AppointmentsTableKpi";
import CashierKpi from "../components/Kpis/CashierKpi";
import LinechartKPI from "../components/Kpis/LinechartKPI";
import { useNavigate } from "react-router";
import getGlobal from "../hooks/getGlobal";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  CACHE_KEY_MonthlyAppointments,
  CACHE_KEY_CanceledMonthlyAppointments,
} from "../constants";
import {
  NewAppointments,
  MonthlyAppointmentsKpiClient,
  CanceledAppointments,
  CanceledMonthlyAppointmentsKpiClient,
} from "../services/KpisService";
import ReferralPatient from "../components/Kpis/ReferralPatient";

const DashboardKpiPage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = getGlobal(
    {} as NewAppointments,
    CACHE_KEY_MonthlyAppointments,
    MonthlyAppointmentsKpiClient,
    { staleTime: 30000 }
  );
  const { data: data1, isLoading: isLoading1 } = getGlobal(
    {} as CanceledAppointments,
    CACHE_KEY_CanceledMonthlyAppointments,
    CanceledMonthlyAppointmentsKpiClient,
    { staleTime: 300000 }
  );
  if (isLoading || isLoading1) return <LoadingSpinner />;
  Object;
  const labels = data ? Object.keys(data) : [];
  const dataset = {
    labels,
    datasets: [
      {
        label: "Rendez-vous",
        data: data ? Object.values(data1) : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const dataset1 = {
    labels,
    datasets: [
      {
        label: "Rendez-vous annulés",
        data: data ? Object.values(data1) : [],
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
        <Box
          className="!w-full shadow-md text-white bg-[#6b37e7] lg:col-span-4 cursor-pointer "
          onClick={() => navigate("/Appointmens/table")}
        >
          <TotalAppointmentsKpi />
          <LinechartKPI dataset={dataset} />
        </Box>
        <Box className="!w-full shadow-md bg-[#eff0f1] text-gray-950 lg:col-span-4 ">
          <CanceledAppointmentsKpi />
          <LinechartKPI dataset={dataset1} />
        </Box>
      </div>
      <Box className="Flex w-full ">
        <Box className="w-full shadow-md bg-[#eff0f1] text-gray-950 flex flex-col">
          <h1 className="text-xl font-semibold p-6">Salle d'attente</h1>
          <AppointmentsTableKpi />
        </Box>
      </Box>
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-12 gap-6">
        <Box className="!w-full shadow-md bg-[#eff0f1] lg:col-span-12 text-gray-950 flex flex-col p-6 gap-3">
          <h1 className="text-xl font-semibold">Graphique des revenus</h1>
          <RevenueKpi />
        </Box>
        <Box className="!w-full shadow-md bg-[#eff0f1] lg:col-span-4 text-gray-950 flex flex-col p-6 gap-3">
          <h1 className="text-xl font-semibold">Groupe d’âge des patients</h1>
          <PatientAgeGroupKpi />
        </Box>
        <Box className="w-full shadow-md bg-[#eff0f1] lg:col-span-4 text-gray-950 flex flex-col p-6 gap-3">
          <TotalpatientsKpi />
          <ReferralPatient />
        </Box>
      </div>

      <Box className="flex w-full "></Box>
    </div>
  );
};

export default DashboardKpiPage;
