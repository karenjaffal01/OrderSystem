import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import {
  Button,
  Box,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/auth/me"); // endpoint from backend
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          gap: 2,
        }}
      >
        <Avatar sx={{ width: 100, height: 100 }}>
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </Avatar>
        <Typography variant="h5">{user?.username}</Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
