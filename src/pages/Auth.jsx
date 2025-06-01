import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';

const Auth = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMsg(''); // clear previous errors

    const url =
      mode === 'login'
        ? 'https://agxbackend-1.onrender.com/auth/login'
        : 'https://agxbackend-1.onrender.com/auth/signup';

    try {
      const res = await axios.post(url, { email, password });
      const { token, data } = res.data;

      // Save token and user info securely (localStorage used here for simplicity)
      localStorage.setItem('admin-token', token);
      localStorage.setItem('admin-user', JSON.stringify(data));
      localStorage.setItem('isAdminLoggedIn', 'true');

      // Navigate to admin dashboard (make sure route is correct)
      navigate('/admin/admindashboard');
    } catch (err) {
      console.error(`${mode} request failed:`, err);

      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else if (err.request) {
        setErrorMsg('No response from server. Please check backend connection.');
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          align="center"
          gutterBottom
          tabIndex={0} // accessibility focus
        >
          {mode === 'login' ? 'Admin Login' : 'Admin Sign Up'}
        </Typography>

        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(e, value) => value && setMode(value)}
          fullWidth
          aria-label="Select authentication mode"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="login" aria-label="Login mode">Login</ToggleButton>
          {/* Uncomment if sign-up enabled */}
          {/* <ToggleButton value="signup" aria-label="Sign up mode">Sign Up</ToggleButton> */}
        </ToggleButtonGroup>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }} role="alert" aria-live="assertive">
            {errorMsg}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          noValidate
          aria-describedby={errorMsg ? 'error-message' : undefined}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ style: { borderRadius: 4 } }}
            inputProps={{ 'aria-label': 'Email address' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            fullWidth
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ style: { borderRadius: 4 } }}
            inputProps={{ 'aria-label': 'Password' }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ borderRadius: 4 }}
            aria-label={mode === 'login' ? 'Log in' : 'Sign up'}
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
