import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { login } from "../../api/auth";
import formBg from "../../assets/form-bg.jpg";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      dispatch(loginSuccess(res.data));
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.role);
      navigate("/profile");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${formBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "primary.main" }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              {...register("Username", { required: "Username is required" })}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              {...register("password", { required: "Password is required" })}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 3,
                py: 1.2,
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
              }}
            >
              Login
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "text.secondary" }}
            >
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
