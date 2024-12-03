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
import { Collapse, Divider, List } from "@mui/material";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import useUserRoles from "./zustand/UseRoles";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import OutputOutlinedIcon from "@mui/icons-material/OutputOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import { useState } from "react";

import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
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
      {can([
        "insert_patient",
        "access_patient",
        "update_patient",
        "delete_patient",
        "detail_patient",
        "doctor",
      ]) && (
        <Link to="/Patients" className="no-underline">
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Patients" />
          </ListItemButton>
        </Link>
      )}
      {can(["access_debt", "doctor"]) && (
        <Link to="/Opérations-inachevées" className="no-underline">
          <ListItemButton>
            <ListItemIcon>
              <AutorenewOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Opérations inachevées" />
          </ListItemButton>
        </Link>
      )}
      {can([
        "access_ordonance",
        "insert_ordonance",
        "update_ordonance",
        "delete_ordonance",
        "doctor",
      ]) && (
        <Link to="/Ordonnance" className="no-underline">
          <ListItemButton>
            <ListItemIcon>
              <MedicationLiquidOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Ordonnance" />
          </ListItemButton>
        </Link>
      )}
      {can(["access_blood", "insert_blood", "delete_blood", "doctor"]) && (
        <Link to="/bloodtest" className="no-underline">
          <ListItemButton>
            <ListItemIcon>
              <BloodtypeOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Analyse" />
          </ListItemButton>
        </Link>
      )}
      {can(["access_creance", "doctor"]) && (
        <Link to="/Creance" className="no-underline">
          <ListItemButton>
            <ListItemIcon>
              <AccountBalanceOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Créance" />
          </ListItemButton>
        </Link>
      )}
      {can(["access_debt", "insert_debt", "delete_debt", "doctor"]) && (
        <Link to="/Reglement" className="no-underline">
          <ListItemButton>
            <ListItemIcon>
              <RequestQuoteOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Règlement" />
          </ListItemButton>
        </Link>
      )}
      {can([
        "access_external_debt",
        "insert_external_debt",
        "delete_external_debt",
        "doctor",
      ]) && (
        <Link to="/External" className="no-underline">
          <ListItemButton>
            <ListItemIcon>
              <AddBusinessOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Règlement extern" />
          </ListItemButton>
        </Link>
      )}
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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      {can(["doctor"]) && (
        <Link to="/Nurses" className="no-underline">
          <ListItemButton>
            <ListItemIcon>
              <BadgeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Gestion du personnel" />
          </ListItemButton>
        </Link>
      )}
      <Divider />
      {can([
        "access_document",
        "insert_document",
        "delete_document",
        "download_document",
        "detail_document",
        "doctor",
      ]) && (
        <Link to="/Files" className="no-underline">
          <ListItemButton>
            <ListItemIcon>
              <ContentPasteSearchOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="imagerie" />
          </ListItemButton>
        </Link>
      )}
      {can([
        "access_supplier",
        "add_supplier",
        "delete_supplier",
        "modify_supplier",
        "access_stock",
        "add_stock",
        "delete_stock",
        "modify_stock",
        "access_product",
        "add_product",
        "delete_product",
        "modify_product",
        "access_historique_enter",
        "add_historique_enter",
        "delete_historique_enter",
        "modify_historique_enter",
        "access_historique_sortie",
        "doctor",
      ]) && (
        <ListItemButton
          onClick={handleClick}
          style={{
            flexGrow: "0",
            WebkitFlexGrow: "0",
          }}
        >
          <ListItemIcon>
            <Inventory2OutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Gestion des stocks" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      )}
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        style={{
          minHeight: "unset",
        }}
      >
        <List component="div" disablePadding>
          {can([
            "access_supplier",
            "add_supplier",
            "delete_supplier",
            "modify_supplier",
            "doctor",
          ]) && (
            <Link to="/Supplier" className="no-underline">
              <ListItemButton>
                <ListItemIcon>
                  <PersonAddAlt1OutlinedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Fournisseur" />
              </ListItemButton>
            </Link>
          )}
          {can([
            "access_product",
            "add_product",
            "delete_product",
            "modify_product",
            "add_stock",
            "doctor",
          ]) && (
            <Link to="/Stock" className="no-underline">
              <ListItemButton>
                <ListItemIcon>
                  <InventoryOutlinedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Stock" />
              </ListItemButton>
            </Link>
          )}
          {can([
            "access_historique_enter",
            "delete_historique_enter",
            "modify_historique_enter",
            "doctor",
          ]) && (
            <Link to="/Stock/entry" className="no-underline">
              <ListItemButton>
                <ListItemIcon>
                  <InputOutlinedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Historique des entrées" />
              </ListItemButton>
            </Link>
          )}
          {can([
            "access_historique_sortie",
            "delete_historique_enter",
            "doctor",
          ]) && (
            <Link to="/Stock/exit" className="no-underline">
              <ListItemButton>
                <ListItemIcon>
                  <OutputOutlinedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Historique des sorties" />
              </ListItemButton>
            </Link>
          )}
        </List>
      </Collapse>

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
