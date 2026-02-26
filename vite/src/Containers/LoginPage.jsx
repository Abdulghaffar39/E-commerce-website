import React, { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import FormInput from "../components/FormInput";
import ButtonAnimated from "../components/ButtonAnimated";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Yahan backend API call lagegi
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "#fff",
          p: 6,
          borderRadius: 4,
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          textAlign: "center",
          transform: "translateY(0)",
          transition: "all 0.5s ease",
          "&:hover": { transform: "translateY(-5px)" },
        }}
      >
        <Typography variant="h3" mb={2} fontWeight="bold" color="#203a43">
          Welcome Back
        </Typography>
        <Typography variant="body1" mb={4} color="#555">
          Log in to your account
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Link href="#" underline="hover" color="#11998e">
              Forgot Password?
            </Link>
          </Box>

          <ButtonAnimated type="submit" fullWidth sx={{ mt: 4, py: 1.5 }}>
            Log In
          </ButtonAnimated>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;