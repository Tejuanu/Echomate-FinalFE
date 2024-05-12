import React from "react";
import Menu, { MenuProps } from "@mui/material/Menu";

interface MenuComponentProps {
  anchorEl: any;
  onClose: any;
  children: any;
  PaperProps?: MenuProps["PaperProps"];
  anchorOrigin?: MenuProps["anchorOrigin"];
}

export default function MenuComponent({
  anchorEl,
  onClose,
  children,
  PaperProps,
  anchorOrigin = { vertical: "top", horizontal: "right" },
}: MenuComponentProps) {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      PaperProps={PaperProps}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {children}
    </Menu>
  );
}
