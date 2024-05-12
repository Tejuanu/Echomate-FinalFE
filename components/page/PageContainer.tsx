import React from "react";
import Page from "./Page";
import Box from "@mui/material/Box";
import { Container, SxProps, ContainerProps } from "@mui/material";
import useScreenSize from "utils/hooks/useScreenSize";

export default function PageContainer({
  sx,
  title,
  children,
  containerProps = {}
}: {
  sx?: SxProps;
  title: string;
  children: React.ReactNode;
  containerProps?: ContainerProps;
}) {
  const {
    sm,
    xs,
    md,
    lg
  } = useScreenSize();
  const padding = sm || xs ? 0 : md ? 2 : lg ? 4 : 6;
  return (
    <Page title={title}>
      <Box p={padding} pt={2} sx={sx}>
        <Container {...containerProps}>{children}</Container>
      </Box>
    </Page>
  );
}
