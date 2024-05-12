import React from "react";
import Tooltip from "@mui/material/Tooltip";

export default function CustomTooltip({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) {
  return (
    <Tooltip placement="right" arrow title={title}>
      {children}
    </Tooltip>
  );
}
