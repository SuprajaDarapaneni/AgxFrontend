import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';  // <-- import Helmet

import Topbar from '../components/Topbar';
import Sidebar from '../components/sidebar';

const drawerWidth = 240;

const Dashboard = () => {
  const { t } = useTranslation();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const [mobileOpen, setMobileOpen] = useState(false);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode(prev => (prev === 'light' ? 'dark' : 'light')),
  }), []);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: '#3f51b5',
        },
        background: {
          default: mode === 'light' ? '#f9fafb' : '#121212',
          paper: mode === 'light' ? '#f9fafb' : '#121212',
        },
      },
      typography: {
        // Improve font sizes or weights for better readability if needed
      },
    }), [mode]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>{t('dashboard.title')} | AGX International</title>
        <meta
          name="description"
          content={t('dashboard.metaDescription') || 'Welcome to the AGX International Dashboard where you manage your account and activities.'}
        />
        <html lang={t('lang') || 'en'} />
      </Helmet>

      <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
        <Topbar
          onDrawerToggle={handleDrawerToggle}
          colorMode={colorMode}
          mode={mode}
          drawerWidth={drawerWidth}
        />
        <Sidebar
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />

        <Box
          component="main"
          role="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: '64px',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowY: 'auto',
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            tabIndex={-1} // for skip-link focus management if you have skip links
          >
            {t('dashboard.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('dashboard.welcomeMessage')}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
