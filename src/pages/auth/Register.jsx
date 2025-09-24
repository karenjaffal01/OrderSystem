import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { register as reg } from "../../api/auth";
import formBg from "../../assets/form-bg.jpg";

export default function Register() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      Username: data.Username,
      Password: data.Password,
    };
    try {
      const res = await reg(payload);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
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
            Create Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            Fill in your details to get started
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
              {...register("Password", { required: "Password is required" })}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
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
              Register
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "text.secondary" }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
