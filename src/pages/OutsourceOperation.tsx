import { Outlet, useLocation } from "react-router";
import ClinicOperationsTable from "../components/Tables/ClinicOperationsTable";

const OutsourceOperation = () => {
  const location = useLocation();
  const isDetailsRoute = location.pathname.startsWith("/External/ajouter");

  return (
    <>
      {isDetailsRoute ? null : <ClinicOperationsTable />} <Outlet />
    </>
  );
};

export default OutsourceOperation;
