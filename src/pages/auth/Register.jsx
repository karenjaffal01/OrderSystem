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
import { useNavigate } from "react-router-dom";
import { register as reg } from "../../api/auth";
export default function Register() {
  const navigate = useNavigate();
  const {handleSubmit, register} = useForm();
  const onSubmit = async (data) => {
    const payload = {
      Username: data.Username,
      Password: data.Password
    };
    try{
      const res = await reg(payload);
      navigate('/login');
    }catch(err){
      console.error("Registration failed", err);
    }
  }
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="Username" variant="outlined" fullWidth required {...register('Username', {required: "Username is required"})} />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register('Password', {required: "Password is required"})}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            {...register('confirmPassword', {required: "Please confirm your password"})}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
