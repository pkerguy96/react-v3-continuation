import { CACHE_KEY_CanceledApppointments } from "../../constants";
import getGlobal from "../../hooks/getGlobal";
import {
  CanceledAppointmentsKpiClient,
  CanceledappointmentsCount,
} from "../../services/KpisService";
import LoadingSpinner from "../LoadingSpinner";

const CanceledAppointmentsKpi = ({ className }: { className?: string }) => {
  const { data, isLoading } = getGlobal(
    {} as CanceledappointmentsCount,
    CACHE_KEY_CanceledApppointments,
    CanceledAppointmentsKpiClient,
    undefined
  );
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={`p-6  flex flex-col flex-1 gap-1 ${className}`}>
      <h1 className="text-base font-medium">Rendez-vous annulés</h1>
      <p className="text-4xl font-semibold text-pink-600">{data}</p>
    </div>
  );
};

export default CanceledAppointmentsKpi;
