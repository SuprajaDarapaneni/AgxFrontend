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
  CircularProgress, // Added for loading indicator
} from "@mui/material";
import axios from "axios";

import Topbar from "../components/Topbar";
import Sidebar from "../components/sidebar";

const drawerWidth = 240;

const ProductAdmin = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state for uploads

  // --- Cloudinary Configuration (Replace with your actual values) ---
  const cloudName = "YOUR_CLOUD_NAME"; // Replace with your Cloudinary cloud name
  const uploadPreset = "YOUR_UPLOAD_PRESET"; // Replace with your unsigned upload preset

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#4f46e5" },
          background: {
            default: mode === "light" ? "#f9fafb" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          error: { main: "#ef4444" },
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
    bannerTitle: "",
    introduction: "",
    productRange: "",
    additionalInfo: "",
    whyChooseUs: "",
    coverImage: null, // This will still hold the File object temporarily
    multipleImages: [], // This will still hold File objects temporarily
  });
  const [existingCoverImageUrl, setExistingCoverImageUrl] = useState("");
  const [existingMultipleImageUrls, setExistingMultipleImageUrls] = useState(
    []
  );
  const [expandedProducts, setExpandedProducts] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.get(
        "https://agxbackend-1.onrender.com/client/getproducts"
      );
      const sortedProducts = res.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
=======
      const res = await axios.get("https://agx-backedn.onrender.com/client/getproducts");
      // Sort products by creation date in ASCENDING order (oldest first, last added last)
      // Assuming your product objects have a 'createdAt' field.
      const sortedProducts = res.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
>>>>>>> f94b94fe8015937335825ae184ba4ffce1056922
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      bannerTitle: "",
      introduction: "",
      productRange: "",
      additionalInfo: "",
      whyChooseUs: "",
      coverImage: null,
      multipleImages: [],
    });
    setIsEditMode(false);
    setEditingProductId(null);
    setShowForm(false);
    setExistingCoverImageUrl("");
    setExistingMultipleImageUrls([]);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
<<<<<<< HEAD
      await axios.delete(
        `https://agxbackend-1.onrender.com/client/deleteproduct/${id}`
      );
=======
      await axios.delete(`https://agx-backedn.onrender.com/client/deleteproduct/${id}`);
>>>>>>> f94b94fe8015937335825ae184ba4ffce1056922
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
      bannerTitle: product.bannerTitle || "",
      introduction: product.introduction || "",
      productRange: product.productRange || "",
      additionalInfo: product.additionalInfo || "",
      whyChooseUs: product.whyChooseUs || "",
      coverImage: null, // Will be set only if a new file is selected
      multipleImages: [], // Will be set only if new files are selected
    });
<<<<<<< HEAD
    // Cloudinary URLs are absolute, so no need to prepend base URL
    setExistingCoverImageUrl(product.coverImage || "");
    setExistingMultipleImageUrls(product.multipleImages || []);
=======
    setExistingCoverImageUrl(product.coverImage ? `https://agx-backedn.onrender.com${product.coverImage}` : "");
    setExistingMultipleImageUrls(
      product.multipleImages ? product.multipleImages.map((img) => `https://agx-backedn.onrender.com${img}`) : [],
    );
>>>>>>> f94b94fe8015937335825ae184ba4ffce1056922

    setIsEditMode(true);
    setEditingProductId(product._id);
    setShowForm(true);
  };

  // --- New function to upload image to Cloudinary ---
  const uploadImageToCloudinary = async (file) => {
    setLoading(true); // Start loading
    const cloudinaryData = new FormData();
    cloudinaryData.append("file", file);
    cloudinaryData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        cloudinaryData
      );
      setLoading(false); // End loading
      return res.data.secure_url; // Return the public URL
    } catch (error) {
      setLoading(false); // End loading even on error
      console.error("Error uploading to Cloudinary:", error);
      alert("Failed to upload image to Cloudinary.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start general form submission loading

    let coverImageUrl = existingCoverImageUrl;
    let multipleImageUrls = [...existingMultipleImageUrls];

    // Upload cover image if a new one is selected
    if (formData.coverImage) {
      const url = await uploadImageToCloudinary(formData.coverImage);
      if (url) {
        coverImageUrl = url;
      } else {
        setLoading(false);
        return; // Stop submission if cover image upload fails
      }
    }

    // Upload multiple images if new ones are selected
    if (formData.multipleImages.length > 0) {
      const uploadedUrls = [];
      for (const file of formData.multipleImages) {
        const url = await uploadImageToCloudinary(file);
        if (url) {
          uploadedUrls.push(url);
        } else {
          setLoading(false);
          return; // Stop submission if any multiple image upload fails
        }
      }
      // For multiple images, decide if you want to replace existing or add to them.
      // Here, we're replacing if new ones are provided. If you want to add,
      // you'd do: multipleImageUrls = [...existingMultipleImageUrls, ...uploadedUrls];
      multipleImageUrls = uploadedUrls;
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      bannerTitle: formData.bannerTitle,
      introduction: formData.introduction,
      productRange: formData.productRange,
      additionalInfo: formData.additionalInfo,
      whyChooseUs: formData.whyChooseUs,
      coverImage: coverImageUrl,
      multipleImages: multipleImageUrls,
    };

    try {
      if (isEditMode) {
<<<<<<< HEAD
        await axios.patch(
          `https://agxbackend-1.onrender.com/client/updateproduct/${editingProductId}`,
          productData // Send as JSON, not FormData, as image URLs are now strings
        );
      } else {
        await axios.post(
          "https://agxbackend-1.onrender.com/client/addproduct",
          productData // Send as JSON
        );
=======
        await axios.patch(`https://agx-backedn.onrender.com/client/updateproduct/${editingProductId}`, data);
      } else {
        await axios.post("https://agx-backedn.onrender.com/client/addproduct", data);
>>>>>>> f94b94fe8015937335825ae184ba4ffce1056922
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setLoading(false); // Always stop loading at the end
    }
  };

  const toggleExpand = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const renderContentWithToggle = (text, productId, initialLineLimit = 2) => {
    if (!text) return null;

    const lines = text.split("\n").filter((line) => line.trim());
    const isExpanded = expandedProducts[productId];
    const needsToggle = lines.length > initialLineLimit;

    const displayLines =
      needsToggle && !isExpanded ? lines.slice(0, initialLineLimit) : lines;

    const renderList = (items, ordered = false) => {
      const ListTag = ordered ? "ol" : "ul";
      return (
        <ListTag style={{ paddingLeft: 20, marginTop: 6, marginBottom: 10 }}>
          {items.map((line, idx) => (
            <li key={idx} style={{ marginBottom: 4, lineHeight: 1.5 }}>
              {line.trim().replace(/^[•-]\s*|^(\d+\.)\s*/, "")}
            </li>
          ))}
        </ListTag>
      );
    };

    let contentToRender;
    if (text.includes("•") || text.includes("-")) {
      contentToRender = renderList(displayLines, false);
    } else if (text.match(/^\d+\./m)) {
      contentToRender = renderList(displayLines, true);
    } else {
      const words = text.split(/\s+/);
      const displayContent =
        needsToggle && !isExpanded && words.length > 30
          ? words.slice(0, 30).join(" ") + "..."
          : text;
      contentToRender = (
        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
          {displayContent}
        </Typography>
      );
    }

    return (
      <>
        {contentToRender}
        {needsToggle && (
          <Button
            size="small"
            onClick={() => toggleExpand(productId)}
            sx={{ p: 0, minWidth: 0, textTransform: "none" }}
          >
            {isExpanded ? "Show Less" : "View More"}
          </Button>
        )}
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
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
            p: 4,
            mt: "64px",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowY: "auto",
            height: "calc(100vh - 64px)",
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
                setFormData({
                  name: "",
                  category: "",
                  description: "",
                  bannerTitle: "",
                  introduction: "",
                  productRange: "",
                  additionalInfo: "",
                  whyChooseUs: "",
                  coverImage: null,
                  multipleImages: [],
                });
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
                width: isNonMobile ? "60%" : "100%",
                mb: 4,
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: theme.palette.background.paper,
                maxHeight: "80vh",
                overflowY: "auto",
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
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
              />

              <TextField
                label="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
              />

              <TextField
                label="Banner Title"
                value={formData.bannerTitle}
                onChange={(e) =>
                  setFormData({ ...formData, bannerTitle: e.target.value })
                }
                multiline
                minRows={1}
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
                helperText="Short catchy title for the banner (e.g., 'Powering Industry with Precision')"
              />

              <TextField
                label="Introduction"
                multiline
                minRows={3}
                value={formData.introduction}
                onChange={(e) =>
                  setFormData({ ...formData, introduction: e.target.value })
                }
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
                helperText="Brief introduction about the product category"
              />

              <TextField
                label="Product Range"
                multiline
                minRows={3}
                value={formData.productRange}
                onChange={(e) =>
                  setFormData({ ...formData, productRange: e.target.value })
                }
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
                helperText="List of products in this category. Use bullet points (•) or numbers (1.) for lists"
              />

              <TextField
                label="Additional Information"
                multiline
                minRows={2}
                value={formData.additionalInfo}
                onChange={(e) =>
                  setFormData({ ...formData, additionalInfo: e.target.value })
                }
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
              />

              <TextField
                label="Why Choose Us"
                multiline
                minRows={3}
                value={formData.whyChooseUs}
                onChange={(e) =>
                  setFormData({ ...formData, whyChooseUs: e.target.value })
                }
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
                helperText="List the key benefits. Use bullet points (•) for better formatting"
              />

              <TextField
                label="Description"
                multiline
                minRows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                fullWidth
                sx={{ bgcolor: mode === "light" ? "white" : "grey.900" }}
                helperText="Detailed description. Use bullet points (•) or numbers (1.) for lists"
              />

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Cover Image:
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.files[0] })
                  }
                  style={{ marginBottom: 12 }}
                />

                {formData.coverImage && (
                  <Box mt={1}>
                    <Typography variant="body2">New Cover Image Preview:</Typography>
                    <Box
                      component="img"
                      src={URL.createObjectURL(formData.coverImage)}
                      alt="New Cover Preview"
                      sx={{
                        maxWidth: 160,
                        maxHeight: 160,
                        borderRadius: 2,
                        objectFit: "contain",
                        boxShadow: 2,
                      }}
                    />
                  </Box>
                )}

                {isEditMode && existingCoverImageUrl && !formData.coverImage && (
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
                    setFormData({
                      ...formData,
                      multipleImages: Array.from(e.target.files),
                    })
                  }
                  style={{ marginBottom: 12 }}
                />

                {formData.multipleImages.length > 0 && (
                  <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                    <Typography variant="body2" width="100%" mb={1}>
                      New Additional Image Previews:
                    </Typography>
                    {formData.multipleImages.map((file, idx) => (
                      <Box
                        key={idx}
                        component="img"
                        src={URL.createObjectURL(file)}
                        alt={`New Additional ${idx}`}
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

                {isEditMode &&
                  existingMultipleImageUrls.length > 0 &&
                  formData.multipleImages.length === 0 && (
                    <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                      <Typography variant="body2" width="100%" mb={1} color="text.secondary">
                        Current Additional Images:
                      </Typography>
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
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isEditMode ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
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
                    width: { xs: "100%", sm: 300, md: 280 },
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
                    height="160"
<<<<<<< HEAD
                    image={product.coverImage || "/placeholder.jpg"} // Cloudinary URL or fallback
=======
                    image={
                      product.coverImage
                        ? `https://agx-backedn.onrender.com${product.coverImage}`
                        : "/placeholder.jpg"
                    }
>>>>>>> f94b94fe8015937335825ae184ba4ffce1056922
                    alt={product.name}
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      pb: 1,
                      maxHeight: 220,
                      overflowY: "auto",
                      scrollbarWidth: "thin",
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "2px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 700, mb: 1, lineHeight: 1.2 }}
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Category:</strong> {product.category}
                    </Typography>

                    {product.bannerTitle && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" color="primary" sx={{ display: "inline" }}>
                          <strong>Banner:</strong>
                        </Typography>{" "}
                        {renderContentWithToggle(
                          product.bannerTitle,
                          `${product._id}-bannerTitle`,
                          1
                        )}
                      </Box>
                    )}

                    {product.introduction && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.5 }}>
                          Introduction:
                        </Typography>
                        {renderContentWithToggle(
                          product.introduction,
                          `${product._id}-introduction`
                        )}
                      </Box>
                    )}

                    {product.productRange && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.5 }}>
                          Product Range:
                        </Typography>
                        {renderContentWithToggle(
                          product.productRange,
                          `${product._id}-productRange`
                        )}
                      </Box>
                    )}

                    {product.additionalInfo && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.5 }}>
                          Additional Info:
                        </Typography>
                        {renderContentWithToggle(
                          product.additionalInfo,
                          `${product._id}-additionalInfo`
                        )}
                      </Box>
                    )}

                    {product.whyChooseUs && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.5 }}>
                          Why Choose Us:
                        </Typography>
                        {renderContentWithToggle(
                          product.whyChooseUs,
                          `${product._id}-whyChooseUs`
                        )}
                      </Box>
                    )}

                    {product.description && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.5 }}>
                          Description:
                        </Typography>
                        {renderContentWithToggle(
                          product.description,
                          `${product._id}-description`
                        )}
                      </Box>
                    )}
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(product._id)}
                      sx={{ borderRadius: 2 }}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(product)}
                      sx={{ borderRadius: 2 }}
                    >
                      Edit
                    </Button>
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