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
    <div className="flex flex-wrap  gap-2">
      <h1 className="text-xl font-semibold w-max">Total patients</h1>
      <p className="text-xl font-semibold text-blue-600 w-max">{data}</p>
    </div>
  );
};

export default TotalpatientsKpi;
