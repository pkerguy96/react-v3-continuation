import getGlobal from "../../hooks/getGlobal";
import {
  TotalPatientKpiClient,
  TotalPatients,
} from "../../services/KpisService";
import { CACHE_KEY_totalPatients } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";

const TotalpatientsKpi = () => {
  const { data, isLoading } = getGlobal(
    {} as TotalPatients,
    CACHE_KEY_totalPatients,
    TotalPatientKpiClient,
    undefined
  );
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 pb-2 flex flex-col flex-1 gap-1">
      <h1 className="text-base font-semibold">Nombre total de patients</h1>
      <p className="text-4xl font-semibold text-blue-600">{data}</p>
    </div>
  );
};

export default TotalpatientsKpi;
