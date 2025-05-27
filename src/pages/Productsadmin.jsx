import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  Collapse,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Stack,
  CssBaseline,
  ThemeProvider,
  createTheme
} from "@mui/material";
import axios from "axios";

import Topbar from "../components/Topbar";
import Sidebar from "../components/sidebar";

const drawerWidth = 240;

const ProductAdmin = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  const [mobileOpen, setMobileOpen] = useState(false);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light"))
  }), []);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: { main: "#3f51b5" },
        background: {
          default: mode === "light" ? "#f4f6f8" : "#121212",
          paper: mode === "light" ? "#ffffff" : "#1d1d1d",
        }
      }
    }), [mode]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    coverImage: null,
    multipleImages: [],
  });
  const [existingCoverImageUrl, setExistingCoverImageUrl] = useState("");
  const [existingMultipleImageUrls, setExistingMultipleImageUrls] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://agxbackend.onrender.com/client/getproducts");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", category: "", description: "", coverImage: null, multipleImages: [] });
    setIsEditMode(false);
    setEditingProductId(null);
    setShowForm(false);
    setExistingCoverImageUrl("");
    setExistingMultipleImageUrls([]);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://agxbackend.onrender.com/client/deleteproduct/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      coverImage: null,
      multipleImages: [],
    });
    setExistingCoverImageUrl(product.coverImage ? `https://agxbackend.onrender.com${product.coverImage}` : "");
    setExistingMultipleImageUrls(
      product.multipleImages ? product.multipleImages.map(img => `https://agxbackend.onrender.com${img}`) : []
    );

    setIsEditMode(true);
    setEditingProductId(product._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("description", formData.description);

    if (formData.coverImage) {
      data.append("coverImage", formData.coverImage);
    }

    if (formData.multipleImages.length > 0) {
      for (let i = 0; i < formData.multipleImages.length; i++) {
        data.append("multipleImages", formData.multipleImages[i]);
      }
    }

    try {
      if (isEditMode) {
        await axios.patch(`https://agxbackend.onrender.com/client/updateproduct/${editingProductId}`, data);
      } else {
        await axios.post("https://agxbackend.onrender.com/client/addproduct", data);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  const renderBulletPoints = (text) => {
    if (!text) return null;
    return (
      <ul style={{ paddingLeft: "20px", marginTop: 4, marginBottom: 8 }}>
        {text.split("\n").map((line, idx) => (
          <li key={idx} style={{ marginBottom: 4 }}>{line.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
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
            mt: "64px",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowY: "auto",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary
          }}
        >
          <Typography variant="h4" gutterBottom>Manage Products</Typography>

          <Button
            variant="contained"
            onClick={() => {
              if (showForm && !isEditMode) {
                resetForm();
              } else {
                setShowForm(!showForm);
                setIsEditMode(false);
                setFormData({ name: "", category: "", description: "", coverImage: null, multipleImages: [] });
                setExistingCoverImageUrl("");
                setExistingMultipleImageUrls([]);
              }
            }}
            sx={{ mb: 2 }}
          >
            {showForm ? (isEditMode ? "Cancel Edit" : "Close Form") : "Add Product"}
          </Button>

          <Collapse in={showForm} timeout="auto" unmountOnExit>
            <Box
              component="form"
              onSubmit={handleSubmit}
              mt={2}
              display="flex"
              flexDirection="column"
              gap={2}
              width={isNonMobile ? "40%" : "100%"}
            >
              <Typography variant="h6">{isEditMode ? "Update Product" : "Add Product"}</Typography>

              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                multiline
                minRows={2}
              />
              <TextField
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <TextField
                label="Description"
                multiline
                minRows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />

              <Typography variant="subtitle1">Cover Image:</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.files[0] })}
              />
              {isEditMode && existingCoverImageUrl && (
                <Box mt={1}>
                  <Typography variant="body2">Current Cover Image:</Typography>
                  <img
                    src={existingCoverImageUrl}
                    alt="Current Cover"
                    style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "contain" }}
                  />
                  <Typography variant="caption">Select a new file above to replace it.</Typography>
                </Box>
              )}

              <Typography variant="subtitle1">Additional Images:</Typography>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFormData({ ...formData, multipleImages: Array.from(e.target.files) })}
              />
              {isEditMode && existingMultipleImageUrls.length > 0 && (
                <Box mt={1}>
                  <Typography variant="body2">Current Additional Images:</Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {existingMultipleImageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Additional ${index}`}
                        style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain" }}
                      />
                    ))}
                  </Stack>
                  <Typography variant="caption">Select new files above to add/replace them.</Typography>
                </Box>
              )}

              <Button type="submit" variant="contained" color="primary">
                {isEditMode ? "Update" : "Submit"}
              </Button>
            </Box>
          </Collapse>

          <Stack direction="row" flexWrap="wrap" gap={2} mt={3}>
            {products.map((product) => (
              <Card key={product._id} sx={{ width: 300 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.coverImage ? `https://agxbackend.onrender.com${product.coverImage}` : "/placeholder.jpg"}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">Name</Typography>
                  {renderBulletPoints(product.name)}

                  <Typography variant="h6" mt={2}>Category</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {product.category}
                  </Typography>

                  <Typography variant="h6">Description</Typography>
                  {renderBulletPoints(product.description)}

                  {product.multipleImages && product.multipleImages.length > 0 && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">More Images:</Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {product.multipleImages.map((imgUrl, index) => (
                          <img
                            key={index}
                            src={`https://agxbackend.onrender.com${imgUrl}`}
                            alt={`${product.name} additional image ${index}`}
                            style={{ width: "60px", height: "60px", objectFit: "cover", border: "1px solid #ccc" }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(product._id)}>Delete</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProductAdmin;
