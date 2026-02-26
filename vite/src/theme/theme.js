import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#11998e",
    },
    secondary: {
      main: "#38ef7d",
    },
    background: {
      default: "#f0f4f8",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default theme;