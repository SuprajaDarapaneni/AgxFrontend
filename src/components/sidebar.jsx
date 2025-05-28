// src/components/Sidebar.jsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ArticleOutlined,
  RateReviewOutlined,
  // SettingsOutlined // Not used currently, but kept for reference if you enable it
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
   const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Define your navigation items with their relative paths
  const navItems = [
    { text: t('sidebar.dashboard'), icon: <DashboardOutlined />, path: '/' },
    { text: t('sidebar.products'), icon: <ShoppingCartOutlined />, path: '/products' },
    { text: t('sidebar.blogs'), icon: <ArticleOutlined />, path: '/blogs' },
    { text: t('sidebar.reviews'), icon: <RateReviewOutlined />, path: '/reviews' },
  ];

  const drawerContent = (
    <>
      <Box sx={{ padding: 2, backgroundColor: theme.palette.primary.main, color: '#fff' }}>
        <Typography variant="h6">Admin Panel</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => {
          // Construct the full path for the admin dashboard routes
          const fullPath = `/Admin/Admindashboard${item.path}`;

          return (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(fullPath); // Navigate to the full path
                if (isMobile) onDrawerToggle(); // Auto-close on mobile
              }}
              // Highlight the selected item based on the full path
              selected={location.pathname === fullPath}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;