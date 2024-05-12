import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "src/service/firebase";
import { Link } from "react-router-dom";
import AccountMenu from "src/layout/AccountMenu";
import { Icon } from "@iconify/react";
import useAuthStatus from "utils/hooks/useAuthStatus";
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { switchToDark, switchToLight } from "src/redux/reducers/theme.reducer";
import SearchAutocomplete from "components/inputs/SearchAutocomplete";
import CustomTooltip from "components/tooltip/Tooltip";

const links = [{ path: "/", title: "Home" }];

export default function Topbar() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | boolean>(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  let [isSignedIn] = useAuthStatus();
  const {
    theme: { mode },
    socket,
  } = useAppSelector((state) => ({
    theme: state.theme,
    socket: state.socket.socket,
  }));

  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
      elevation={0}
    >
      <Toolbar disableGutters sx={{ px: { xs: 1, md: 5 } }}>
        <IconButton
          onClick={() => setOpenDrawer(true)}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <Icon icon="bx:menu" />
        </IconButton>
        <Stack direction="row" alignItems="center">
          <Link to="/" style={{ marginRight: 16 }}>
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              {import.meta.env.VITE_APP_NAME}
            </Typography>
          </Link>
          <SearchAutocomplete />
        </Stack>
        <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          spacing={2}
          sx={{ display: { xs: "none", md: "flex" }, pr: 22 }}
        >
          {/* {renderLinks} */}
          <CustomTooltip title="Home">
            <Link to="/">
              <IconButton>
                <Icon icon="fluent:home-32-filled" />
              </IconButton>
            </Link>
          </CustomTooltip>
          <CustomTooltip title="Friends">
            <Link to="/all-friends">
              {" "}
              <IconButton>
                <Icon icon="el:group-alt" />
              </IconButton>
            </Link>
          </CustomTooltip>
          <CustomTooltip title="Profile">
            <Link to="/profile">
              {" "}
              <IconButton>
                <Icon icon="iconamoon:profile-circle-fill" />
              </IconButton>
            </Link>
          </CustomTooltip>
        </Stack>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box minWidth={200}>
            <Box
              sx={{
                p: 2,
                textAlign: "center",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" sx={{ color: "text.primary" }}>
                Echo mate
              </Typography>
            </Box>
            <List>
              {links.map((item) => (
                <Link
                  to={item.path}
                  key={item.path}
                  onClick={() => setOpenDrawer(false)}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
        <Button
          sx={{
            bgcolor: socket?.connected ? "green" : "red",
            color: "white",
            mr: 2,
          }}
        >
          {socket?.connected ? "Online" : "Offline"}
        </Button>
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          {mode === "light" ? (
            <IconButton
              onClick={() => dispatch(switchToDark())}
              sx={{ width: 40, height: 40 }}
            >
              <Icon icon="twemoji:sun" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => dispatch(switchToLight())}
              sx={{ width: 40, height: 40 }}
            >
              <Icon icon="icon-park:moon" />
            </IconButton>
          )}
          {isSignedIn && (
            <AccountMenu
              handleClose={handleClose}
              handleLogout={handleLogout}
              handleClick={handleClick}
              anchorEl={anchorEl}
              open={open}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
