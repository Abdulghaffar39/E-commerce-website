import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const AnimatedButton = styled(Button)({
  background: "linear-gradient(90deg, #11998e, #38ef7d)",
  color: "#fff",
  fontWeight: "bold",
  padding: "12px 0",
  borderRadius: "8px",
  fontSize: "16px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    background: "linear-gradient(90deg, #38ef7d, #11998e)",
  },
});

const ButtonAnimated = ({ children, ...props }) => {
  return <AnimatedButton {...props}>{children}</AnimatedButton>;
};

export default ButtonAnimated;