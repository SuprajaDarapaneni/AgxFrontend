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
  createTheme,
  Divider,
  Tooltip,
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
    toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
  }), []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#4f46e5" }, // Indigo-600 more vivid
          background: {
            default: mode === "light" ? "#f9fafb" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          error: { main: "#ef4444" }, // Red-500 for error buttons
        },
        typography: {
          fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
          h4: {
            fontWeight: 700,
            letterSpacing: "0.02em",
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 600,
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
      product.multipleImages ? product.multipleImages.map((img) => `https://agxbackend.onrender.com${img}`) : []
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
      formData.multipleImages.forEach((file) => data.append("multipleImages", file));
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
      <ul style={{ paddingLeft: 20, marginTop: 6, marginBottom: 10 }}>
        {text.split("\n").map((line, idx) => (
          <li key={idx} style={{ marginBottom: 4, lineHeight: 1.5 }}>
            {line.trim()}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
        <Topbar
          onDrawerToggle={handleDrawerToggle}
          colorMode={colorMode}
          mode={mode}
          drawerWidth={drawerWidth}
        />
        <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            mt: "64px",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Manage Products
          </Typography>

          <Button
            variant="contained"
            color="primary"
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
            sx={{ mb: 3, borderRadius: 2, px: 4, py: 1.5, fontSize: 16 }}
          >
            {showForm ? (isEditMode ? "Cancel Edit" : "Close Form") : "Add Product"}
          </Button>

          <Collapse in={showForm} timeout="auto" unmountOnExit>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: isNonMobile ? "40%" : "100%",
                mb: 4,
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {isEditMode ? "Update Product" : "Add Product"}
              </Typography>

              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                multiline
                minRows={2}
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
              />
              <TextField
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
              />
              <TextField
                label="Description"
                multiline
                minRows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
              />

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Cover Image:
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.files[0] })}
                  style={{ marginBottom: 12 }}
                />
                {isEditMode && existingCoverImageUrl && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Current Cover Image:
                    </Typography>
                    <Box
                      component="img"
                      src={existingCoverImageUrl}
                      alt="Current Cover"
                      sx={{
                        maxWidth: 160,
                        maxHeight: 160,
                        borderRadius: 2,
                        objectFit: "contain",
                        boxShadow: 2,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" mt={0.5}>
                      Select a new file above to replace it.
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Additional Images:
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setFormData({ ...formData, multipleImages: Array.from(e.target.files) })
                  }
                  style={{ marginBottom: 12 }}
                />
                {isEditMode && existingMultipleImageUrls.length > 0 && (
                  <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                    {existingMultipleImageUrls.map((url, index) => (
                      <Box
                        component="img"
                        key={index}
                        src={url}
                        alt={`Additional ${index}`}
                        sx={{
                          width: 90,
                          height: 90,
                          borderRadius: 2,
                          objectFit: "cover",
                          boxShadow: 1,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      />
                    ))}
                  </Stack>
                )}
                {isEditMode && (
                  <Typography variant="caption" color="text.secondary" mt={0.5}>
                    Select new files above to add/replace them.
                  </Typography>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 3, fontWeight: 700, mt: 2 }}
              >
                {isEditMode ? "Update Product" : "Add Product"}
              </Button>
            </Box>
          </Collapse>

          <Divider sx={{ mb: 3 }} />

          {products.length === 0 ? (
            <Typography variant="h6" color="text.secondary" align="center" mt={6}>
              No products found. Start by adding a new product.
            </Typography>
          ) : (
            <Stack direction="row" flexWrap="wrap" gap={3} justifyContent="start">
              {products.map((product) => (
                <Card
                  key={product._id}
                  sx={{
                    width: 320,
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 8,
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.coverImage ? `https://agxbackend.onrender.com${product.coverImage}` : "/placeholder.jpg"}
                    alt={product.name}
                    sx={{ objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      <strong>Category:</strong> {product.category}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {renderBulletPoints(product.description)}
                    </Typography>
                    {product.multipleImages && product.multipleImages.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Additional Images:
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                          {product.multipleImages.map((imgUrl, index) => (
                            <Box
                              component="img"
                              key={index}
                              src={`https://agxbackend.onrender.com${imgUrl}`}
                              alt={`${product.name} additional image ${index}`}
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 1.5,
                                objectFit: "cover",
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: 1,
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end", gap: 1, px: 2, pb: 2 }}>
                    <Tooltip title="Edit Product">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(product)}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(product._id)}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                      >
                        Delete
                      </Button>
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

export default ProductAdmin;
