import React from "react";
import { Outlet, useLocation } from "react-router";
import SupplierTable from "../components/Tables/SupplierTable";
import AddSupplier from "./AddForms/AddSupplier";

const SupplierPage = () => {
  const location = useLocation();

  const isAddRoute = location.pathname === "/Supplier/ajouter";
  return <>{isAddRoute ? <Outlet /> : <SupplierTable />}</>;
};

export default SupplierPage;
