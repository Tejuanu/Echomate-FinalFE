import { Stack, SxProps } from "@mui/material";
import React from "react";

export default function TextContainer({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) {
  return (
    <Stack direction="row" alignItems="center" sx={sx}>
      {children}
    </Stack>
  );
}
