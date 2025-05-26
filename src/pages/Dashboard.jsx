// src/pages/Dashboard.jsx
import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  CssBaseline, // Needed for Material-UI styling reset
  ThemeProvider, // Needed for theme context
  createTheme, // Needed to create the theme
  useMediaQuery // Needed for dark mode preference
} from '@mui/material';

// Import your custom Topbar and Sidebar components
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar'; // Ensure this path is correct for your actual Sidebar component

const drawerWidth = 240; // Define a drawer width for the sidebar, consistent with your Sidebar component

const Dashboard = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const [mobileOpen, setMobileOpen] = useState(false); // State for sidebar mobile visibility

  // Color mode context for toggling theme
  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }), []);

  // Material-UI theme creation
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: '#3f51b5',
        },
        background: {
          default: mode === 'light' ? '#f4f6f8' : '#121212',
          paper: mode === 'light' ? '#ffffff' : '#1d1d1d', // Typically, paper is a lighter shade for components
        }
      },
      // You might want to add custom typography, components, etc. here
    }), [mode]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply global CSS reset based on theme */}
      <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
        {/* Topbar component */}
        <Topbar
          onDrawerToggle={handleDrawerToggle}
          colorMode={colorMode}
          mode={mode}
          // The Topbar might also need the drawerWidth to adjust its content
          drawerWidth={drawerWidth}
        />

        {/* Sidebar component */}
        <Sidebar
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />

        {/* Main content area for the Dashboard */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // Adjust padding to account for Topbar height and Sidebar width
            // This padding should be consistent with the AppLayout's main Box
            p: 3, // Material UI theme spacing unit (default 8px), so 3 * 8 = 24px padding
            marginTop: '64px', // Standard Topbar height
            // marginLeft: { sm: `${drawerWidth}px` }, // If sidebar is fixed, content shifts
            width: { sm: `calc(100% - ${drawerWidth}px)` }, // Content width if sidebar fixed
            overflowY: 'auto', // Enable scrolling for content
            backgroundColor: theme.palette.background.default, // Use theme background color
            color: theme.palette.text.primary, // Use theme text color
          }}
        >
          {/* Your actual Dashboard content */}
          <Typography variant="h4" gutterBottom>
            Dashboard Content
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to the dashboard! This page now manages its own layout.
          </Typography>
          {/* Add your dashboard widgets and content here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
