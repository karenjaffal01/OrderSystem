import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import {
  Button,
  Box,
  Avatar,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/Auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ece9e6, #ffffff)",
      }}
    >
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            maxWidth: 350,
            width: "100%",
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "#1976d2",
              fontSize: 48,
            }}
          >
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {user?.username}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Role: {user?.role || "User"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              mt: 3,
              width: "100%",
              py: 1.2,
              fontSize: "1rem",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserProfile;
