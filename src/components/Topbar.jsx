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
import { useTranslation } from 'react-i18next';  // <-- import i18n

const Topbar = ({ onDrawerToggle, colorMode, mode }) => {
  const { t } = useTranslation();  // <-- hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={2}>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={onDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            {t('topbar.brandName')}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title={t('topbar.toggleTheme')}>
            <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <Tooltip title={t('topbar.settings')}>
            <IconButton color="inherit">
              <SettingsOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('topbar.account')}>
            <IconButton color="inherit">
              <AccountCircleOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('topbar.logout')}>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
