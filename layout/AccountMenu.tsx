import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "components/avatar/AvatarComponent";
import { Icon } from "@iconify/react";
import MenuContainer from "src/components/menu/MenuContainer";
import { useNavigate } from "react-router-dom";

function CustomMenuItem({ icon, title, onClick }) {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      {title}
    </MenuItem>
  );
}

export default function AccountMenu({
  handleClose,
  handleLogout,
  handleClick,
  anchorEl,
  open,
}) {
  const navigate = useNavigate();
  let email = localStorage.getItem("email");
  let name = localStorage.getItem("name");
  let showName = name?.split(" ")[0][0];
  if (name && name.split(" ").length > 1) {
    showName += name?.split(" ")[1][0];
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 40, height: 40 }} />
        </IconButton>
      </Box>
      <MenuContainer anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem sx={{ pointerEvents: "none" }}>
          <Typography>{email}</Typography>
        </MenuItem>
        <Divider />
        <CustomMenuItem
          icon={<Icon icon="iconamoon:profile-bold" />}
          title="Profile"
          onClick={() => {
            navigate("/profile");
            handleClose();
          }}
        />
        <CustomMenuItem
          icon={<Icon icon="ic:outline-logout" />}
          title="Logout"
          onClick={handleLogout}
        />
      </MenuContainer>
    </React.Fragment>
  );
}
