import { Outlet, useLocation } from "react-router";
import StockTable from "../components/Tables/StockTable";

const StockPage = () => {
  const location = useLocation();
  const outletRoutes = [
    "/Stock/ajouter",
    "/Stock/product",
    "/Stock/entry",
    "/Stock/exit",
  ];
  /*   const isAddRoute = location.pathname === "/Stock/ajouter";
  const isProductAddStock = location.pathname === "/Stock/product";
  const isProductEntry = location.pathname === "/Stock/product";
  const isProductExit = location.pathname === "/Stock/product"; */
  return (
    <>
      {outletRoutes.includes(location.pathname) ? <Outlet /> : <StockTable />}
    </>
  );
};

export default StockPage;
