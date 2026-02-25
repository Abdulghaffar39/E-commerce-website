import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Paper
} from "@mui/material";

const Signup = () => {
  return (
    <Box
      sx={{
        minHeight: "93vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        p: 2
      }}
    >
      <Grid container maxWidth="lg">
        
        {/* Left Side - Hidden on Mobile */}
        <Grid
          item
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            color: "#fff"
          }}
        >
          <Typography variant="h3" fontWeight="bold" textAlign="center" width="100vw" marginBottom="40px">
            NovaX
          </Typography>
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={10}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              backdropFilter: "blur(20px)",
              background: "rgba(255,255,255,0.08)",
              color: "#fff"
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Create Account
            </Typography>

            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ccc" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#2196f3" }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ccc" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#2196f3" }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ccc" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#2196f3" }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                margin="normal"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ccc" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#2196f3" }
                  }
                }}
              />

              <Button
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  background:
                    "linear-gradient(90deg, #2196f3, #9c27b0)",
                  color: "#fff",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #9c27b0, #2196f3)"
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
