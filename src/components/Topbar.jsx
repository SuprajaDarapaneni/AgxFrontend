import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  SettingsOutlined,
  AccountCircleOutlined,
  Brightness4,
  Brightness7,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Topbar = ({ onDrawerToggle, colorMode, mode }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleLogout = () => {
    // Future: Add auth cleanup, analytics, etc.
    navigate('/'); // This route should have <Helmet> SEO tags set
  };

  return (
    <AppBar
      position="fixed"
      component="header"
      role="banner"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left section: Brand & Menu */}
        <Box display="flex" alignItems="center" gap={2}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={onDrawerToggle}
              aria-label={t('topbar.menu')}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h1"
            sx={{ fontSize: '1.25rem' }}
            noWrap
            role="heading"
            aria-level={1}
          >
            {t('topbar.brandName')}
          </Typography>
        </Box>

        {/* Right section: Actions */}
        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title={t('topbar.toggleTheme')}>
            <IconButton
              color="inherit"
              onClick={colorMode.toggleColorMode}
              aria-label={t('topbar.toggleTheme')}
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          <Tooltip title={t('topbar.settings')}>
            <IconButton color="inherit" aria-label={t('topbar.settings')}>
              <SettingsOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('topbar.account')}>
            <IconButton color="inherit" aria-label={t('topbar.account')}>
              <AccountCircleOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('topbar.logout')}>
            <IconButton
              color="inherit"
              onClick={handleLogout}
              aria-label={t('topbar.logout')}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
