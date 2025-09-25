import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Grid,
  Button
} from "@mui/material";
import { getAllUsers } from "../../api/auth";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
    <Box sx={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <NavBar />
      <Box sx={{ px: 4, py: 6 }}>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <Typography variant="h4" fontWeight="bold" gutterBottom>
    Admin Dashboard
  </Typography>

  <Button
    variant="contained"
    color="primary"
    onClick={handleLogout}
    sx={{
      py: 1.2,
      fontSize: "1rem",
      "&:hover": { backgroundColor: "#1565c0" },
    }}
  >
    Logout
  </Button>
</div>

        <Typography fontWeight="bold" gutterBottom>
          All Users
        </Typography>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "#ffffff",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "#1976d2",
                    fontSize: 32,
                  }}
                >
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Role: {user.role}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
