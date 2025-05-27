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
  ToggleButton,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Auth = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMsg('');
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fbc7d4 0%, #f472b6 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(236,72,153,0.25)',
            backgroundColor: 'white',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="700"
            gutterBottom
            sx={{ color: '#db2777', letterSpacing: 1 }}
          >
            {mode === 'login' ? 'Admin Login' : 'Admin Sign Up'}
          </Typography>

          {/* Mode Switch */}
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, value) => value && setMode(value)}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="login" sx={{ color: '#db2777', fontWeight: '600' }}>
              Login
            </ToggleButton>
            {/* Uncomment below to enable signup */}
            {/* <ToggleButton value="signup" sx={{ color: '#db2777', fontWeight: '600' }}>
              Sign Up
            </ToggleButton> */}
          </ToggleButtonGroup>

          {/* Error Message */}
          {errorMsg && (
            <Alert
              severity="error"
              sx={{ mb: 2, fontWeight: '600', animation: 'fadein 0.5s ease-in-out' }}
            >
              {errorMsg}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!loading) handleSubmit();
            }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ sx: { borderRadius: 2 } }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontWeight: '700',
                fontSize: '1rem',
                backgroundColor: '#db2777',
                '&:hover': {
                  backgroundColor: '#be185d',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : mode === 'login' ? 'Login' : 'Sign Up'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Auth;
