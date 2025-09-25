import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "#fff3f3",
        px: 3,
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="error">
        🚫
      </Typography>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        You do not have permission to view this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Home Page
      </Button>
    </Box>
  );
};

export default AccessDenied;
