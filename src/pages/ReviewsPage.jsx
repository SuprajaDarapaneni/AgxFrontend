import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

const drawerWidth = 240;

const ReviewsPage = () => {
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
        primary: { main: '#3f51b5' },
        background: {
          default: mode === 'light' ? '#f4f6f8' : '#121212',
          paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
        }
      }
    }), [mode]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: '', comment: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch reviews
  useEffect(() => {
    fetch('https://agxbackend.onrender.com/reviewss')
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Failed to fetch reviews:', err));
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

      if (!res.ok) throw new Error('Failed to submit review');

      const result = await res.json();

      if (editingId) {
        setReviews(reviews.map((r) => (r._id === editingId ? result : r)));
        setMessage('Review updated successfully');
      } else {
        setReviews([result, ...reviews]);
        setMessage('Review added successfully');
      }

      setForm({ name: '', rating: '', comment: '' });
      setEditingId(null);
      setTimeout(() => setMessage(''), 3000);
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
      if (!res.ok) throw new Error('Failed to delete review');

      setReviews(reviews.filter((r) => r._id !== id));
      setMessage('Review deleted successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
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
          sx={{
            flexGrow: 1,
            p: 3,
            mt: '64px',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowY: 'auto',
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary
          }}
        >
          <Typography variant="h4" gutterBottom>
            Manage Reviews
          </Typography>

          <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6">
              {editingId ? 'Edit Review' : 'Add New Review'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Rating (1-5)"
                name="rating"
                value={form.rating}
                onChange={handleInputChange}
                fullWidth
                required
                type="number"
                inputProps={{ min: 1, max: 5 }}
                margin="normal"
              />
              <TextField
                label="Comment"
                name="comment"
                value={form.comment}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
              />
              <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  {editingId ? 'Update Review' : 'Add Review'}
                </Button>
                {editingId && (
                  <Button
                    sx={{ ml: 2 }}
                    variant="outlined"
                    onClick={() => {
                      setEditingId(null);
                      setForm({ name: '', rating: '', comment: '' });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </form>
            {message && (
              <Typography color="success.main" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Paper>

          <Typography variant="h6" mb={1}>
            Existing Reviews
          </Typography>
          <Paper>
            <List>
              {reviews.map((review) => (
                <React.Fragment key={review._id}>
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(review)}>
                          <Edit />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(review._id)}>
                          <Delete />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={`${review.name} - ⭐ ${review.rating}`}
                      secondary={review.comment}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {reviews.length === 0 && (
                <Typography sx={{ p: 2 }}>No reviews found.</Typography>
              )}
            </List>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ReviewsPage;
