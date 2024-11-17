import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MedicationLiquidOutlinedIcon from "@mui/icons-material/MedicationLiquidOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";

import PeopleIcon from "@mui/icons-material/People";

import { Link } from "react-router-dom";
/* newly added  */
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp";
import SettingsIcon from "@mui/icons-material/Settings";
import BadgeIcon from "@mui/icons-material/Badge";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Divider } from "@mui/material";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import useUserRoles from "./zustand/UseRoles";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
export const MainListItems = () => {
  const { can } = useUserRoles();

  return (
    <React.Fragment>
      <Link to="/dashboard" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Accueille" />
        </ListItemButton>
      </Link>
      <Link to="/Appointments" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <DateRangeSharpIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Rendez-vous" />
        </ListItemButton>
      </Link>

      <Link to="/Patients" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Patients" />
        </ListItemButton>
      </Link>

      {/*   TODO:: add permissions */}

      <Link to="/Opérations-inachevées" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <AutorenewOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Opérations inachevées" />
        </ListItemButton>
      </Link>

      <Link to="/Ordonnance" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <MedicationLiquidOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Ordonnance" />
        </ListItemButton>
      </Link>

      <Link to="/Creance" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <AccountBalanceOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Créance" />
        </ListItemButton>
      </Link>

      <Link to="/Reglement" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <RequestQuoteOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Règlement" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};
interface Props {
  toggle: boolean;
  isSideBarOpen: boolean;
  handleClick: () => void;
}
export function SecondaryListItems({}: Props) {
  const { can } = useUserRoles();
  return (
    <React.Fragment>
      <Link to="/Nurses" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <BadgeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Gestion du personnel" />
        </ListItemButton>
      </Link>

      <Divider />

      <Link to="/Files" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <ContentPasteSearchOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Documents" />
        </ListItemButton>
      </Link>

      <Link to="/Stock" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <Inventory2OutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Stock" />
        </ListItemButton>
      </Link>
      <Link to="/Supplier" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <PersonAddAlt1OutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Fournisseur" />
        </ListItemButton>
      </Link>

      <Link to="/Settings" className="no-underline mt-auto">
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
  //TODO: add general roles here
}
