import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "src/redux/hooks";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  color: "#fff",
  zIndex: theme.zIndex.modal + 1,
}));

function Loader() {
  const { loading } = useAppSelector((state) => state.loading);
  return (
    <StyledBackdrop open={loading}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
}

export default Loader;
