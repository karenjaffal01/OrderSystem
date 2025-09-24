import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { login } from '../../api/auth'
import { required } from "zod/v4-mini";
import { useNavigate } from "react-router-dom";
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
      localStorage.setItem('role', res.data.role);
      navigate('/profile');
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="Username" variant="outlined" fullWidth required {...register('Username', { required: "Username is required" })} />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register('password', { required: "Password is required" })}
            required
          />
          <Typography variant="body2" align="center">
            Don’t have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
              Register
            </Link>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
