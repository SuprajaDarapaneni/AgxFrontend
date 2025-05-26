import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]); // ✅ updated name
  const [form, setForm] = useState({ name: '', rating: '', comment: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // ✅ Fetch reviews on mount
  useEffect(() => {
    fetch('http://localhost:9000/reviewss') // <- check if this endpoint is correct
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched reviews:', data);
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to fetch reviews:', err));
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // ✅ Update existing review
        const res = await fetch(`http://localhost:9000/reviews/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Failed to update review');

        const updatedReview = await res.json();
        setReviews(reviews.map((r) => (r._id === editingId ? updatedReview : r)));
        setMessage('Review updated successfully');
      } else {
        // ✅ Create new review
        const res = await fetch('http://localhost:9000/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Failed to add review');

        const newReview = await res.json();
        setReviews([newReview, ...reviews]);
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
      const res = await fetch(`http://localhost:9000/reviews/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete review');
      setReviews(reviews.filter((r) => r._id !== id));
      setMessage('Review deleted successfully');

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>
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
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(review)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(review._id)}
                    >
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
  );
};

export default ReviewsPage;
