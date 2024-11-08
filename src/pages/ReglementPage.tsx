import ReglementTable from "../components/ReglementTable";
import { Outlet, useLocation } from "react-router";

const ReglementPage = () => {
  const location = useLocation();

  const isDetailsRoute = location.pathname.startsWith("/Reglement/Details");

  return <>{isDetailsRoute ? <Outlet /> : <ReglementTable />}</>;
};

export default ReglementPage;
