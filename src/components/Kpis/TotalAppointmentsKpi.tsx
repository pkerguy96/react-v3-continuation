import getGlobal from "../../hooks/getGlobal";
import AppointmentsKpiClient, {
  appointmentsCount,
} from "../../services/KpisService";
import { CACHE_KEY_AppointmentsCount } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";

const TotalAppointmentsKpi = ({ className }: { className?: string }) => {
  /*  const { data, isLoading } = getGlobal(
    {} as appointmentsCount,
    CACHE_KEY_AppointmentsCount,
    AppointmentsKpiClient,
    {
      staleTime: 3600000, // 1 hour
    }
  );
  if (isLoading) return <LoadingSpinner /> */ const data = [];
  return (
    <div className={`p-6  flex flex-col flex-1 gap-1 ${className}`}>
      <h1 className="text-base font-medium">Rendez-vous total</h1>
      <p className="text-4xl font-semibold">{data}</p>
    </div>
  );
};

export default TotalAppointmentsKpi;
