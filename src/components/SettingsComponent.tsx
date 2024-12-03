import { ChangeEvent, useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
/*  */
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import MedicationLiquidOutlinedIcon from "@mui/icons-material/MedicationLiquidOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import useUserRoles from "../zustand/UseRoles";
/*  */
const SettingsComponent = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<string | null>(
    location.pathname
  );
  const [isHovered, setIsHovered] = useState(false);
  const { can } = useUserRoles();
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const items = [
    {
      name: "Paramètres des métriques",
      url: "/Settings/Kpis",
      icon: AnalyticsOutlinedIcon,
      checkPermissions: true,
      permissions: ["doctor"],
    },
    {
      name: "Paramètres d'opérations",
      url: "/Settings/Operations",
      icon: MedicationLiquidOutlinedIcon,
      checkPermissions: true,
      permissions: ["doctor", "access_op_settings"],
    },
    {
      name: "Gestion des radiographie",
      url: "/Settings/Xrays",
      icon: LocalHospitalOutlinedIcon,
      checkPermissions: true,
      permissions: ["doctor", "access_xray_settings"],
    },
    {
      name: "Gestion des rôles",
      url: "/Settings/Roles",
      icon: LocalPoliceOutlinedIcon,
      checkPermissions: true,
      permissions: ["doctor"],
    },
    {
      name: " Gestion des Autorisations",
      url: "/Settings/Autorisations",
      icon: AdminPanelSettingsOutlinedIcon,
      checkPermissions: true,
      permissions: ["doctor"],
    },
    {
      name: " Gestion des cliniques",
      url: "/Settings/Clinic",
      icon: HealingOutlinedIcon,
      checkPermissions: true,
      permissions: ["doctor"],
    },
  ];

  return (
    <Paper className="p-4 ">
      <Box className="w-full flex flex-col md:grid md:grid-cols-5 gap-4 ">
        <Box
          className={` transition-all duration-300 ease-in-out col-span-1 md:hover:col-span-2 flex flex-col gap-5 border-1 md:w-20 md:hover:w-full ${
            isHovered ? "md:col-span-2" : "md:col-span-1"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p
            className={`font-semibold text-2xl text-center ${
              isHovered ? "md:text-2xl" : "md:text-md"
            } md:text-start`}
          >
            Settings
          </p>
          <Box className="flex md:hidden">
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-Search">
                Recherche
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-Search"
                className="!rounded-2xl"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                }
                label="Recherche"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FormControl>
          </Box>

          {isHovered ? (
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-Search">
                Recherche
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-Search"
                className="!rounded-2xl"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                }
                label="Recherche"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FormControl>
          ) : (
            <span className="hidden md:flex">
              <SearchOutlinedIcon />
            </span>
          )}

          <Box className="flex flex-col gap-6">
            {items
              .filter(
                (item) =>
                  !item.checkPermissions ||
                  (item.permissions && can(item.permissions))
              ) // Only check permissions if required
              .filter((item) => item.name.toLowerCase().includes(searchQuery)) // Search filter
              .map((item, index) => (
                <Link
                  to={item.url}
                  className={`no-underline`}
                  key={index}
                  style={{
                    display: "block",
                  }}
                  onClick={() => setActiveItem(item.url)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isHovered ? "space-between" : "",
                      color: "grey", // Set color for text
                      gap: ".5rem",
                    }}
                  >
                    <span
                      className={`${
                        activeItem === item.url
                          ? "!text-blue-600"
                          : "text-gray-500"
                      } font-light text-md md:hidden`}
                    >
                      {item.name}
                    </span>
                    <div
                      className={`${
                        activeItem === item.url
                          ? "!text-blue-600"
                          : "text-gray-500"
                      } font-light text-md hidden md:flex items-center gap-4 overflow-hidden`}
                    >
                      <span className="hidden md:block">
                        <item.icon />
                      </span>
                      {isHovered && (
                        <span className="h-[1em] block">{item.name}</span>
                      )}
                    </div>
                    <ArrowForwardIosOutlinedIcon />
                  </div>
                </Link>
              ))}
          </Box>
        </Box>
        <Box
          className={` transition-all duration-300 ease-in-out ${
            isHovered ? "col-span-3" : "col-span-4"
          }  `}
        >
          {/* This is where you render the nested routes */}
          <Outlet />
        </Box>
      </Box>
    </Paper>
  );
};

export default SettingsComponent;
