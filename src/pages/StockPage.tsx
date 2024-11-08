import { Outlet, useLocation } from "react-router";
import StockTable from "../components/StockTable";

const StockPage = () => {
  const location = useLocation();

  const isAddRoute = location.pathname === "/Stock/ajouter";
  return <>{isAddRoute ? <Outlet /> : <StockTable />}</>;
};

export default StockPage;
