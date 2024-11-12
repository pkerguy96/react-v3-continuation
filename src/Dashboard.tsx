import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems, SecondaryListItems } from "./ListItems";

import DashboardMenu from "./components/DashboardMenu";

import WaitingRoomMenu from "./components/WaitingRoomMenu";
import useUserRoles from "./zustand/UseRoles";

const drawerWidth: number = 280;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "linear-gradient(90deg, #4b918c 0%, #76C5BF 100%)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const today = formatFrenchDate(new Date());

export default function Dashboard(Props: React.PropsWithChildren) {
  const [open, setOpen] = React.useState(false);
  const [openListMenu, setOpenListMenu] = React.useState(false);
  const { can } = useUserRoles();
  const toggleListMenu = () => {
    setOpenListMenu(!openListMenu); // Fix the toggleListMenu function
  };
  // onmouse actions for drawer to be opened
  const openDrawerOnmouse = (value: boolean) => {
    setOpen(value);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen((prev) => !prev)}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {today}
          </Typography>
          <WaitingRoomMenu />

          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <DashboardMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Toolbar className="relative flex items-center justify-end px-1">
          {/* Logo - Only visible when the drawer is open */}
          {open && (
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden w-28 h-14">
              <img
                src="/centre-jadid.jpeg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </Box>
          )}

          {/* IconButton - Aligned to the right */}
          <IconButton className="z-10" onClick={() => setOpen((prev) => !prev)}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        <Divider className="mt-1" />

        <List component="nav" className="flex flex-col h-full">
          <MainListItems />
          <Divider sx={{ my: 1 }} />
          <SecondaryListItems
            toggle={openListMenu}
            isSideBarOpen={open}
            handleClick={() => setOpenListMenu(!openListMenu)}
          />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {Props.children}
        </Container>
      </Box>
    </Box>
  );
}
export function formatFrenchDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatted = new Intl.DateTimeFormat("fr-FR", options).format(date);

  const [day, month, year] = formatted.split(" ");
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${day} ${capitalizedMonth} ${year}`;
}
