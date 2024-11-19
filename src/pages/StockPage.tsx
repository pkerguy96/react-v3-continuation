import { Outlet, useLocation } from "react-router";
import StockTable from "../components/Tables/StockTable";

const StockPage = () => {
  const location = useLocation();

  const isAddRoute = location.pathname === "/Stock/ajouter";
  const isProductAddStock = location.pathname === "/Stock/product";
  return <>{isAddRoute || isProductAddStock ? <Outlet /> : <StockTable />}</>;
};

export default StockPage;
