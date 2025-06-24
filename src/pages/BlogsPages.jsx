import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Button, Typography, Paper, Card, CardContent, CardActions, IconButton,
  Divider, CssBaseline, useMediaQuery, ThemeProvider, createTheme, Stack,
  Tooltip, Fade, Avatar, TextField
} from '@mui/material';
import { Edit, Delete, Description } from '@mui/icons-material';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Topbar from '../components/Topbar';
import Sidebar from '../components/sidebar';

const drawerWidth = 240;

const BlogsPage = () => {
  const { t } = useTranslation();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState({ image: null, video: null });

  const colorMode = useMemo(() => ({ toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')) }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#4f46e5' },
      background: {
        default: mode === 'light' ? '#f9fafb' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
      },
      text: {
        primary: mode === 'light' ? '#1a1a1a' : '#fafafa',
        secondary: mode === 'light' ? '#555' : '#bbb',
      },
    },
    typography: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    shape: { borderRadius: 16 },
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
  }), [mode]);

  useEffect(() => {
    fetch('https://agxbackend.onrender.com/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error('Failed to fetch blogs:', err));
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleInputChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const uploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'blogss');
    const cloudName = 'dz5noprbz';

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImageUrl = null;
      let uploadedVideoUrl = null;

      if (files.image) uploadedImageUrl = await uploadFile(files.image, 'image');
      if (files.video) uploadedVideoUrl = await uploadFile(files.video, 'video');

      const updatedData = {
        ...(form.title !== '' && { title: form.title }),
        ...(form.excerpt !== '' && { excerpt: form.excerpt }),
        ...(form.content !== '' && { content: form.content }),
        ...(uploadedImageUrl && { image: uploadedImageUrl }),
        ...(uploadedVideoUrl && { video: uploadedVideoUrl }),
      };

      const url = editingId
        ? `https://agxbackend.onrender.com/blogs/${editingId}`
        : 'https://agxbackend.onrender.com/blogs';

      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error(t('blogspage.failedToSubmitBlog'));
      const result = await res.json();

      setBlogs(editingId
        ? blogs.map((b) => (b._id === editingId ? result : b))
        : [result, ...blogs]);

      setMessage(editingId
        ? t('blogspage.blogUpdatedSuccess')
        : t('blogspage.blogAddedSuccess'));

      setForm({ title: '', excerpt: '', content: '' });
      setFiles({ image: null, video: null });
      setEditingId(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({ title: blog.title || '', excerpt: blog.excerpt || '', content: blog.content || '' });
    setFiles({ image: null, video: null });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://agxbackend.onrender.com/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(t('blogspage.failedToDeleteBlog'));
      setBlogs(blogs.filter((b) => b._id !== id));
      setMessage(t('blogspage.blogDeletedSuccess'));
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
            <title>{`${t('blogspage.manageBlogs')} | AGX-International`}</title>
          </Helmet>

          <Typography variant="h3" fontWeight={700} gutterBottom>{t('blogspage.manageBlogs')}</Typography>

          <Paper sx={{ p: 3, mb: 6, borderRadius: 3, boxShadow: 4 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {editingId ? t('blogspage.editBlog') : t('blogspage.addNewBlog')}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                <TextField label={t('blogspage.title')} name="title" value={form.title} onChange={handleInputChange} fullWidth />
                <TextField label={t('blogspage.excerpt')} name="excerpt" value={form.excerpt} onChange={handleInputChange} fullWidth helperText={t('blogspage.shortSummary')} />
                <Typography>{t('blogspage.content')}</Typography>
                <ReactQuill value={form.content} onChange={(value) => setForm({ ...form, content: value })} theme="snow" />

                <Box>
                  <Typography variant="subtitle1">Upload Image (Optional)</Typography>
                  <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                  {files.image && <img src={URL.createObjectURL(files.image)} alt="Preview" style={{ marginTop: 10, maxWidth: '100%' }} />}
                </Box>

                <Box>
                  <Typography variant="subtitle1">Upload Video (Optional)</Typography>
                  <input type="file" name="video" accept="video/*" onChange={handleFileChange} />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {editingId ? t('blogspage.updateBlog') : t('blogspage.addBlog')}
                  </Button>
                  {editingId && (
                    <Button variant="outlined" color="secondary" fullWidth onClick={() => {
                      setEditingId(null);
                      setForm({ title: '', excerpt: '', content: '' });
                      setFiles({ image: null, video: null });
                    }}>
                      {t('blogspage.cancelEditing')}
                    </Button>
                  )}
                </Box>
              </Stack>
            </Box>
            {message && (
              <Typography color="success.main" sx={{ mt: 2, fontWeight: 600 }} align="center">
                {message}
              </Typography>
            )}
          </Paper>

          <Typography variant="h5" mb={2} fontWeight={700}>{t('blogspage.manageBlogs')}</Typography>

          {blogs.length === 0 ? (
            <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>{t('blogspage.noBlogsFound')}</Typography>
          ) : (
            <Stack spacing={3}>
              {blogs.map((blog) => (
                <Card key={blog._id} variant="outlined" sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                        <Description />
                      </Avatar>
                      <Typography variant="h6" fontWeight={700}>{blog.title}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {blog.date && <time dateTime={new Date(blog.date).toISOString()}>{new Date(blog.date).toLocaleDateString()}</time>}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                      {blog.image && (
                        <Box mt={2}>
                          <img src={blog.image} alt="Blog visual" style={{ maxWidth: '100%' }} />
                        </Box>
                      )}
                      {blog.video && (
                        <Box mt={2}>
                          <video src={blog.video} controls style={{ width: '100%' }} />
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Tooltip title={t('blogspage.edit')} arrow TransitionComponent={Fade}>
                      <IconButton color="primary" onClick={() => handleEdit(blog)}><Edit /></IconButton>
                    </Tooltip>
                    <Tooltip title={t('blogspage.delete')} arrow TransitionComponent={Fade}>
                      <IconButton color="error" onClick={() => handleDelete(blog._id)}><Delete /></IconButton>
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
