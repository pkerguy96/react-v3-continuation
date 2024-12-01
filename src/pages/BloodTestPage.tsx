import React from "react";
import { useLocation } from "react-router";
import BloodtestTable from "../components/Tables/BloodtestTable";
import BloodTestAdd from "./AddForms/BloodTestAdd";

const BloodTestPage = () => {
  const location = useLocation();
  const isAddBloodTestRoute = location.pathname.startsWith("/bloodtest/add");

  return <>{isAddBloodTestRoute ? <BloodTestAdd /> : <BloodtestTable />}</>;
};

export default BloodTestPage;
