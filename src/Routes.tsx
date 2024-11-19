import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import App from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";

import AddPatient from "./pages/AddPatientForm";

import AdminProfile from "./components/AdminProfile";
import Errorpage from "./pages/Errorpage";
import DashboardKpiPage from "./pages/DashboardKpiPage";

import PatientsPage from "./pages/PatientsPage";
import AddNurseForm from "./pages/AddNurseForm";
import NursePage from "./pages/NursePage";
import PatientDetails from "./pages/PatientDetails";
import AppointmentPage from "./pages/AppointmentPage";
import StockPage from "./pages/StockPage";
import OrdonnancePage from "./pages/OrdonnancePage";
import PrintableComponant from "./components/PrintableComponant";
import AddOrdonance from "./pages/AddOrdonance";
import DicomPageViewer from "./pages/DicomPageViewer";
import ReglementPage from "./pages/ReglementPage";

import DicomPage from "./pages/DicomPage";
import AddFile from "./pages/AddFile";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import SettingsPage from "./pages/SettingsPage";
import KpiSettings from "./components/Settings/KpiSettings";
import OperationPayementStatus from "./components/OperationPayementStatus";
import OperationParentPage from "./pages/OperationPages/OperationParentPage";
import DebtPage from "./pages/DebtPage";
import OperationsListSettings from "./components/Settings/OperationsListSettings";
import PermissionsSettings from "./components/Settings/PermissionsSettings";
import RolesSettings from "./components/Settings/RolesSettings";

import AddStockForm from "./pages/AddStockForm";
import SupplierPage from "./pages/SupplierPage";
import AddSupplier from "./pages/AddForms/AddSupplier";
import IncompletedOperations from "./components/Tables/IncompletedOperations";
import NursePaymentpage from "./pages/NursePaymentpage";
import CalenderTable from "./components/Tables/CalenderTable";
import AppointmentsTableKpi from "./components/Kpis/AppointmentsTableKpi";
import XraySettings from "./components/Settings/XraySettings";
import NursePatientXrays from "./pages/NursePatientXrays";
import AddStockToProduct from "./pages/AddForms/AddStockToProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "réinitialisation-mot-de-passe",
        element: <ForgotPassword />,
      },
      {
        path: "reset/:token?/:email?",
        element: <ChangePassword />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "dashboard",
        element: <DashboardKpiPage />,
      },
      {
        path: "Appointments",
        element: <AppointmentPage />,
      },
      {
        path: "Patients",
        element: <PatientsPage />,
        children: [
          {
            path: "Operate/:id/:age?",
            element: <OperationParentPage />,
          },
          {
            path: "Xray",
            element: <OperationParentPage />,
          },
          {
            path: "Details/:id",
            element: <PatientDetails />,
          },
        ],
      },

      {
        path: "Ordonnance",
        element: <OrdonnancePage />,
      },
      {
        path: "Opérations-inachevées",
        element: <IncompletedOperations />,
      },
      {
        path: "AddOrdonance/:id?/:ordonanceID?/:operation_id?",
        element: <AddOrdonance />,
      },
      /*   {
        path: "AddOrdonance/:id?/:operation_id?",
        element: <AddOrdonance />,
      }, */
      {
        path: "PatientCheckout/:operationid?",
        element: <OperationPayementStatus />,
      },
      {
        path: "OrdonanceDetails/:id",
        element: <PrintableComponant />,
      },
      {
        path: "AddPatient/:id?",
        element: <AddPatient />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "Nurses",
        element: <NursePage />,
      },
      {
        path: "AddNurse",
        element: <AddNurseForm />,
      },
      {
        path: "Files",
        element: <DicomPage />,
      },
      {
        path: "Dicom/:id?",
        element: <DicomPageViewer />,
      },
      {
        path: "Stock",
        element: <StockPage />,
        children: [
          {
            path: "ajouter",
            element: <AddStockForm />,
          },
          {
            path: "product",
            element: <AddStockToProduct />,
          },
        ],
      },
      {
        path: "Supplier",
        element: <SupplierPage />,
        children: [
          {
            path: "ajouter",
            element: <AddSupplier />,
          },
        ],
      },
      {
        path: "Reglement",
        element: <ReglementPage />,
      },
      {
        path: "Addfile",
        element: <AddFile />,
      },
      {
        path: "Creance",
        element: <DebtPage />,
      },
      //TODO: translate this to french
      {
        path: "/InvoicePage",
        element: <NursePaymentpage />,
      },
      {
        path: "/Xraydemand",
        element: <NursePatientXrays />,
      },
      {
        path: "/Appointmens/table",
        element: <CalenderTable />,
      },
      {
        path: "Settings",
        element: <SettingsPage />,
        children: [
          {
            path: "Kpis",
            element: <KpiSettings />,
          },
          {
            path: "Operations",
            element: <OperationsListSettings />,
          },
          {
            path: "Roles",
            element: <RolesSettings />,
          },
          {
            path: "Autorisations",
            element: <PermissionsSettings />,
          },
          {
            path: "Xrays",
            element: <XraySettings />,
          },
        ],
      },
    ],
  },
]);
export default router;
