import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ModalComponent from "./ModalComponent";

const AdminProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const storedUserData = localStorage.getItem("user_login");
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const userProfilePicture = parsedUserData
    ? parsedUserData.profile || null
    : null;

  // Handle menu open
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleLogout = () => {
    setIsModalOpen(true);

    handleClose();
  };

  return (
    <Box className="">
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {userProfilePicture ? (
          <Avatar src={userProfilePicture} sx={{ width: 30, height: 30 }} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom", // Adjust the vertical position to bottom
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top", // Adjust the vertical position to top
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          Profil
        </MenuItem>
        <MenuItem onClick={HandleLogout}>déconnecter</MenuItem>
      </Menu>
      {isModalOpen && (
        <ModalComponent
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default AdminProfile;
