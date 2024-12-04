import { Badge, Box, IconButton, Menu, Typography } from "@mui/material";
import React, { useCallback } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import getGlobal from "../hooks/getGlobal";
import { CACHE_KEY_Notification } from "../constants";
import {
  markAsReadApiClient,
  NotificationApiClient,
  NotificationProps,
} from "../services/NotificationService";
import LoadingSpinner from "./LoadingSpinner";
import getUrls from "../hooks/getUrls";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
const NotificationComponent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

  const { data, isLoading } = getGlobal(
    {} as NotificationProps,
    CACHE_KEY_Notification,
    NotificationApiClient,
    {
      refetchInterval: 10000,
    }
  );

  const unreadCount =
    data?.filter((notification: NotificationProps) => !notification.is_read)
      .length || 0;
  const markAsRead = async (id: string, target_id: string, type: string) => {
    await getUrls(id, markAsReadApiClient);
    queryClient.invalidateQueries(CACHE_KEY_Notification);
    if (type === "payment") {
      navigate(`/InvoicePage?target_id=${target_id}`);
    } else if (type === "xray") {
      navigate(`/Xraydemand?target_id=${target_id}`);
    } else {
      return;
    }
  };
  if (isLoading) return <NotificationsIcon />;
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
        <Badge badgeContent={unreadCount} color="secondary">
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
          <span className="font-medium text-md">Notifications</span>
          <Box className="flex flex-row gap-2">
            {/* <IconButton onClick={handleClose} color="inherit" size="small">
              <CloseOutlinedIcon />
            </IconButton> */}
          </Box>
        </Box>
        <Box className="flex flex-col">
          {data?.length === 0 ? (
            <Box className="flex justify-center items-center py-4">
              <Typography className="text-gray-500 text-sm">
                Aucune notification pour le moment
              </Typography>
            </Box>
          ) : (
            data?.map((notification: NotificationProps, index: number) => {
              return (
                <Box
                  className={`flex flex-wrap gap-2 items-center border-t border-gray-200 p-4 ${
                    notification.type === "stock"
                      ? "cursor-default"
                      : "cursor-pointer"
                  }`}
                  key={index}
                  onClick={() => {
                    markAsRead(
                      notification.id,
                      notification.target_id,
                      notification.type
                    );
                  }}
                >
                  <Box className="w-0 flex-1">
                    <Typography
                      className={`${
                        notification.type === "stock" ? "text-red-500" : ""
                      }`}
                    >
                      {notification.title}
                    </Typography>
                    {notification.message && (
                      <Typography className="text-xs text-gray-500">
                        {notification.message}
                      </Typography>
                    )}
                    <Typography className="text-xs text-gray-500">
                      {notification.date}
                    </Typography>
                  </Box>
                  {!notification.is_read && (
                    <span className="block w-2 h-2 rounded-full bg-blue-500"></span>
                  )}
                </Box>
              );
            })
          )}
        </Box>
      </Menu>
    </>
  );
};

export default NotificationComponent;
