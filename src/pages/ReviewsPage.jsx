import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';  // <-- import here
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Stack,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import Topbar from '../components/Topbar';
import Sidebar from '../components/sidebar';

const drawerWidth = 240;

const ReviewsPage = () => {
  const { t, i18n } = useTranslation(); // <-- useTranslation hook

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const [mobileOpen, setMobileOpen] = useState(false);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }), []);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: { main: '#4f46e5' },
        background: {
          default: mode === 'light' ? '#fafafa' : '#121212',
          paper: mode === 'light' ? '#fff' : '#1e1e1e',
        },
        success: { main: '#4caf50' }
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      }
    }), [mode]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: '', comment: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetch('https://agxbackend.onrender.com/reviewss')
      .then(res => res.json())
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(err => console.error('Failed to fetch reviews:', err));
  }, []);

  const handleInputChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `https://agxbackend.onrender.com/reviews/${editingId}`
        : 'https://agxbackend.onrender.com/reviews';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(t('reviewspage.notifications.errorSubmit'));

      const result = await res.json();

      if (editingId) {
        setReviews(reviews.map(r => (r._id === editingId ? result : r)));
        showMessage(t('reviewspage.notifications.updated'));
      } else {
        setReviews([result, ...reviews]);
        showMessage(t('reviewspage.notifications.added'));
      }

      setForm({ name: '', rating: '', comment: '' });
      setEditingId(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setForm({ name: review.name, rating: review.rating, comment: review.comment });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://agxbackend.onrender.com/reviews/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(t('reviewspage.notifications.errorDelete'));

      setReviews(reviews.filter(r => r._id !== id));
      showMessage(t('reviewspage.notifications.deleted'));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Topbar onDrawerToggle={handleDrawerToggle} colorMode={colorMode} mode={mode} drawerWidth={drawerWidth} />
        <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            mt: '64px',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowY: 'auto',
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            {t('reviewspage.pageTitle')}
          </Typography>

          <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3, backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h6" mb={3} fontWeight="medium" color="primary">
              {editingId ? t('reviewspage.form.editTitle') : t('reviewspage.form.addTitle')}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label={t('reviewspage.form.fields.name')}
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                />
                <TextField
                  label={t('reviewspage.form.fields.rating')}
                  name="rating"
                  value={form.rating}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  type="number"
                  inputProps={{ min: 1, max: 5 }}
                  variant="outlined"
                />
                <TextField
                  label={t('reviewspage.form.fields.comment')}
                  name="comment"
                  value={form.comment}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                  required
                  variant="outlined"
                />
                <Stack direction="row" spacing={2}>
                  <Button type="submit" variant="contained" color="primary" size="large">
                    {editingId ? t('reviewspage.form.buttons.submitEdit') : t('reviewspage.form.buttons.submitAdd')}
                  </Button>
                  {editingId && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      onClick={() => {
                        setEditingId(null);
                        setForm({ name: '', rating: '', comment: '' });
                      }}
                    >
                      {t('reviewspage.form.buttons.cancel')}
                    </Button>
                  )}
                </Stack>
              </Stack>
            </form>
          </Paper>

          <Typography variant="h5" mb={3} fontWeight="bold" color="primary">
            {t('reviewspage.existingReviewsTitle')}
          </Typography>

          <Stack spacing={3}>
            {reviews.length === 0 && (
              <Typography sx={{ p: 2, textAlign: 'center' }} color="text.secondary">
                {t('reviewspage.noReviews')}
              </Typography>
            )}

            {reviews.map((review) => (
              <Card
                key={review._id}
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  '&:hover': { boxShadow: 6 },
                  transition: 'box-shadow 0.3s ease-in-out',
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="bold">
                      {review.name}
                    </Typography>
                    <Chip
                      label={t('reviewspage.ratingLabel', { rating: review.rating })}
                      color="secondary"
                      sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                    />
                  </Stack>
                  <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                    {review.comment}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="edit" onClick={() => handleEdit(review)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(review._id)} color="error">
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Stack>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ReviewsPage;
