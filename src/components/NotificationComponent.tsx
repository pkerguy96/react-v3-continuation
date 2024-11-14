import { Badge, Box, IconButton, Menu, Typography } from "@mui/material";
import React, { useCallback } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
const NotificationComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Badge badgeContent={10} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          style: {
            width: "400px",
            padding: 0,
            maxHeight: 470,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          },
          "aria-labelledby": "basic-button",
        }}
      >
        <Box
          tabIndex={-1}
          className="flex items-center justify-between p-2 px-4"
        >
          <span className="font-medium text-md">Notificationss</span>
          <Box className="flex flex-row gap-2">
            {/* <IconButton onClick={handleClose} color="inherit" size="small">
              <CloseOutlinedIcon />
            </IconButton> */}
          </Box>
        </Box>
        <Box className="flex flex-col">
          <Box className="flex flex-wrap gap-2 items-center border-t border-gray-200 p-4">
            <Box className="w-0 flex-1">
              <Typography>Some Notification</Typography>
              <Typography className="text-xs text-gray-500">
                time here
              </Typography>
            </Box>
            <span className="block w-2 h-2 rounded-full bg-blue-500"></span>
          </Box>
          <Box className="flex flex-wrap gap-2 items-center border-t border-gray-200 p-4">
            <Box className="w-0 flex-1">
              <Typography>Some Notification</Typography>
              <Typography className="text-xs text-gray-500">
                time here
              </Typography>
            </Box>
            <span className="block w-2 h-2 rounded-full bg-blue-500"></span>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationComponent;
