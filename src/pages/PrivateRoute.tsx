import { Outlet } from "react-router";
import Dashboard from "../Dashboard";

const PrivateRoute = () => {
  return (
    <>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </>
  );
};

export default PrivateRoute;
