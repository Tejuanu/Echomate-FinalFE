import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function CustomIconButton({
  title,
  onClick,
  icon,
  sx,
  ...rest
}: {
  title: string;
  onClick?: (e: any) => void;
  icon: React.ReactNode;
  sx?: any;
  rest?: any;
}) {
  return (
    <Tooltip title={title} arrow>
      <IconButton size="small" onClick={onClick} sx={{ ...sx }} {...rest}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
