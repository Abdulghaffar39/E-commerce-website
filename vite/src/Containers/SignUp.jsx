import { Box, Typography, FormInput, Button } from '@mui/material'
import React from 'react'

export default function SignUp() {

    return (

        <div>

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
                        maxWidth: 600,           // Increased width
                        bgcolor: "#fff",
                        p: 6,                    // Increased padding
                        borderRadius: 4,
                        boxShadow: "0 25px 50px rgba(0,0,0,0.2)", // Bigger shadow
                        textAlign: "center",
                        transform: "translateY(0)",
                        transition: "all 0.5s ease",
                        "&:hover": { transform: "translateY(-5px)" },
                    }}
                >
                    <Typography variant="h3" mb={2} fontWeight="bold" color="#203a43">
                        Create Your Account
                    </Typography>
                    <Typography variant="body1" mb={4} color="#555">
                        Sign up to access all features and start your journey
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <FormInput label="Name" name="name" />
                        <FormInput label="Email" name="email" type="email" />
                        <FormInput label="Password" name="password" type="password" />

                        <Button type="submit" fullWidth sx={{ mt: 4, py: 1.5 }}>
                            Sign Up
                        </Button>
                    </form>
                </Box>
            </Box>

        </div>
    )
}
