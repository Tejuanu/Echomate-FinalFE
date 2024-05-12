import React from 'react'
import LoginForm from './LoginForm'
import Page from "components/page/Page";
import { Box } from "@mui/material";

function Login() {
  return (
    <Page title="Login" description="Login">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#E5E5E5",
        }}
      >
        <LoginForm />
      </Box>
    </Page>
  );
}

export default Login
