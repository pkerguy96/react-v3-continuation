import { Outlet, useLocation } from "react-router";
import SupplierTable from "../components/Tables/SupplierTable";

const SupplierPage = () => {
  const location = useLocation();

  const isAddRoute = location.pathname === "/Supplier/ajouter";
  return <>{isAddRoute ? <Outlet /> : <SupplierTable />}</>;
};

export default SupplierPage;
