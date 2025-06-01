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

  const navItems = [
    { text: t('sidebar.dashboard'), icon: <DashboardOutlined />, path: '/' },
    { text: t('sidebar.products'), icon: <ShoppingCartOutlined />, path: '/products' },
    { text: t('sidebar.blogs'), icon: <ArticleOutlined />, path: '/blogs' },
    { text: t('sidebar.reviews'), icon: <RateReviewOutlined />, path: '/reviews' },
  ];

  const drawerContent = (
    <nav aria-label="Admin sidebar navigation">
      <Box sx={{ padding: 2, backgroundColor: theme.palette.primary.main, color: '#fff' }}>
        <Typography variant="h6" role="heading" aria-level={1}>
          Admin Panel
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => {
          const fullPath = `/Admin/Admindashboard${item.path}`;
          const isSelected = location.pathname === fullPath;

          return (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(fullPath);
                if (isMobile) onDrawerToggle();
              }}
              selected={isSelected}
              aria-current={isSelected ? 'page' : undefined}
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
    </nav>
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
      aria-label="Mobile sidebar"
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
      aria-label="Desktop sidebar"
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
