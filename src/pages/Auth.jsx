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
    setErrorMsg('');

    const url =
      mode === 'login'
        ? 'https://agxbackend.onrender.com/auth/login'
        : 'https://agxbackend.onrender.com/auth/signup';

    try {
      const res = await axios.post(url, { email, password });

      const { token, data } = res.data;

      localStorage.setItem('admin-token', token);
      localStorage.setItem('admin-user', JSON.stringify(data));

      navigate('/Admin/Admindashboard');
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
        <Typography variant="h5" align="center" gutterBottom>
          {mode === 'login' ? 'Admin Login' : 'Admin Sign Up'}
        </Typography>

        {/* Mode Switch */}
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(e, value) => value && setMode(value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <ToggleButton value="login">Login</ToggleButton>
          {/* <ToggleButton value="signup">Sign Up</ToggleButton> */}
        </ToggleButtonGroup>

        {/* Error Message */}
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
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
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ style: { borderRadius: 4 } }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ style: { borderRadius: 4 } }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ borderRadius: 4 }}
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
