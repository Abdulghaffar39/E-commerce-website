import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import SignupPage from "./Containers/SignupPage";
import theme from "./theme/theme";
import LoginPage from "./Containers/LoginPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignupPage />
      <LoginPage />
    </ThemeProvider>
  );
}

export default App;