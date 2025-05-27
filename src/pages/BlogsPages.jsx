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
import Sidebar from '../components/sidebar';

const drawerWidth = 240;

const BlogsPage = () => {
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

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://agxbackend.onrender.com/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Failed to fetch blogs:', err));
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = editingId
        ? `https://agxbackend.onrender.com/blogs/${editingId}`
        : 'https://agxbackend.onrender.com/blogs';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to submit blog');

      const result = await res.json();

      if (editingId) {
        setBlogs(blogs.map(b => (b._id === editingId ? result : b)));
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

  const handleEdit = blog => {
    setEditingId(blog._id);
    setForm({ title: blog.title, excerpt: blog.excerpt, content: blog.content || '' });
  };

  const handleDelete = async id => {
    try {
      const res = await fetch(`https://agxbackend.onrender.com/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog');

      setBlogs(blogs.filter(b => b._id !== id));
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
            Manage Blogs
          </Typography>

          <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6">{editingId ? 'Edit Blog' : 'Add New Blog'}</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
                helperText="Short summary of the blog"
              />
              <TextField
                label="Content"
                name="content"
                value={form.content}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={6}
                margin="normal"
              />
              <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  {editingId ? 'Update Blog' : 'Add Blog'}
                </Button>
                {editingId && (
                  <Button
                    sx={{ ml: 2 }}
                    variant="outlined"
                    onClick={() => {
                      setEditingId(null);
                      setForm({ title: '', excerpt: '', content: '' });
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

          <Typography variant="h6" mb={1}>Existing Blogs</Typography>
          <Paper>
            <List>
              {blogs.map(blog => (
                <React.Fragment key={blog._id}>
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(blog)}>
                          <Edit />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(blog._id)}>
                          <Delete />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={blog.title}
                      secondary={
                        blog.excerpt.length > 100
                          ? blog.excerpt.substring(0, 100) + '...'
                          : blog.excerpt
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {blogs.length === 0 && (
                <Typography sx={{ p: 2 }}>No blogs found.</Typography>
              )}
            </List>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BlogsPage;
