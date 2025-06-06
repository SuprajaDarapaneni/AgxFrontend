import React, { useState, useEffect, useMemo } from 'react';
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
  Divider,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Stack,
  Tooltip,
  Fade,
  Avatar,
} from '@mui/material';
import { Edit, Delete, Description } from '@mui/icons-material';
import { Helmet } from 'react-helmet';

import Topbar from '../components/Topbar';
import Sidebar from '../components/sidebar';

const drawerWidth = 240;

const BlogsPage = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const [mobileOpen, setMobileOpen] = useState(false);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#4f46e5' }, // Purple-ish
          background: {
            default: mode === 'light' ? '#f9fafb' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
          },
          text: {
            primary: mode === 'light' ? '#1a1a1a' : '#fafafa',
            secondary: mode === 'light' ? '#555' : '#bbb',
          },
        },
        typography: {
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        shape: {
          borderRadius: 16,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [mode]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://agxbackend-1.onrender.com/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error('Failed to fetch blogs:', err));
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `https://agxbackend-1.onrender.com/blogs/${editingId}`
        : 'https://agxbackend-1.onrender.com/blogs';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to submit blog');

      const result = await res.json();

      if (editingId) {
        setBlogs(blogs.map((b) => (b._id === editingId ? result : b)));
        setMessage('Blog updated successfully');
      } else {
        setBlogs([result, ...blogs]);
        setMessage('Blog added successfully');
      }

      setForm({ title: '', excerpt: '', content: '' });
      setEditingId(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({ title: blog.title, excerpt: blog.excerpt, content: blog.content || '' });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://agxbackend-1.onrender.com/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog');

      setBlogs(blogs.filter((b) => b._id !== id));
      setMessage('Blog deleted successfully');
      setTimeout(() => setMessage(''), 3000);
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
          aria-label="Manage Blogs"
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
          <Helmet>
            <title>Manage Blogs | AGX International</title>
            <meta
              name="description"
              content="Manage blog posts on AGX International platform. Add, edit, or delete blogs easily."
            />
            {/* If this page is admin-only, uncomment next line */}
            {/* <meta name="robots" content="noindex, nofollow" /> */}
          </Helmet>

          <Typography variant="h3" fontWeight={700} gutterBottom>
            Manage Blogs
          </Typography>

          <Paper sx={{ p: 3, mb: 6, borderRadius: 3, boxShadow: 4 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {editingId ? 'Edit Blog' : 'Add New Blog'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                <TextField
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  autoFocus
                  inputProps={{ maxLength: 100 }}
                  aria-label="Blog Title"
                />
                <TextField
                  label="Excerpt"
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  helperText="Short summary of the blog (max 200 characters)"
                  inputProps={{ maxLength: 200 }}
                  aria-label="Blog Excerpt"
                />
                <TextField
                  label="Content"
                  name="content"
                  value={form.content}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={8}
                  placeholder="Write the full content here..."
                  aria-label="Blog Content"
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ flexGrow: 1 }}
                    aria-label={editingId ? 'Update Blog' : 'Add Blog'}
                  >
                    {editingId ? 'Update Blog' : 'Add Blog'}
                  </Button>
                  {editingId && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      sx={{ flexGrow: 1 }}
                      onClick={() => {
                        setEditingId(null);
                        setForm({ title: '', excerpt: '', content: '' });
                      }}
                      aria-label="Cancel editing"
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Stack>
            </Box>

            {message && (
              <Typography color="success.main" sx={{ mt: 2, fontWeight: 600, fontSize: 16 }} align="center">
                {message}
              </Typography>
            )}
          </Paper>

          <Typography variant="h5" mb={2} fontWeight={700}>
            Existing Blogs
          </Typography>

          {blogs.length === 0 ? (
            <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>No blogs found.</Typography>
          ) : (
            <Stack spacing={3}>
              {blogs.map((blog) => (
                <Card
                  component="article"
                  key={blog._id}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                        <Description />
                      </Avatar>
                      <Typography variant="h6" fontWeight={700}>
                        {blog.title}
                      </Typography>
                    </Box>
                    {/* Optional blog date */}
                    {blog.date && (
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                        <time dateTime={new Date(blog.date).toISOString()}>
                          {new Date(blog.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                      {blog.excerpt.length > 150 ? blog.excerpt.substring(0, 150) + '...' : blog.excerpt}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
                    <Tooltip title="Edit" arrow TransitionComponent={Fade}>
                      <IconButton color="primary" onClick={() => handleEdit(blog)} aria-label="edit blog">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow TransitionComponent={Fade}>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(blog._id)}
                        aria-label="delete blog"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BlogsPage;
