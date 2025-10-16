import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Box, Paper, Typography, Grid, TextField, Button,
  FormControl, InputLabel, Select, MenuItem,
  CircularProgress, Alert, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCamera from '@mui/icons-material/PhotoCamera'; // أيقونة للكاميرا

function AddProductForm() {
  // --- لا يوجد أي تغيير في هذا الجزء المنطقي ---
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // 1. إضافة state جديدة لمعاينة الصورة
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost/dental_api/get_categories.php')
      .then(response => {
        if (response.data.length > 0) {
          setCategories(response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Failed to load product categories.');
      });
  }, []);

  // 2. تحديث دالة اختيار الصورة لتشمل المعاينة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // إنشاء رابط مؤقت للمعاينة
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!image) {
      setError('Please select a product image.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category_id', categoryId);
    formData.append('image', image);
    try {
      await axios.post('http://localhost/dental_api/add_product.php', formData);
      setSuccess('Product added successfully! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard/products');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // --- كل التغييرات تمت هنا في الجزء المرئي ---
    <Paper sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1">
          Add New Product
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        {/* الحاوية الرئيسية التي تقسم الشاشة لعمودين */}
        <Grid container spacing={4}>

          {/* --- العمود الأيسر (حقول البيانات) --- */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField label="Product Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Price (EGP)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={8} />
              </Grid>
            </Grid>
          </Grid>

          {/* --- العمود الأيمن (القسم والصورة والزر) --- */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select value={categoryId} label="Category" onChange={(e) => setCategoryId(e.target.value)}>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {/* صندوق رفع ومعاينة الصورة */}
                <Box
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    padding: 2,
                    textAlign: 'center',
                    height: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Product Preview" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  ) : (
                    <>
                      <PhotoCamera sx={{ fontSize: 50, color: '#aaa' }} />
                      <Typography color="text.secondary">Upload Image</Typography>
                    </>
                  )}
                </Box>
                <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
                  Choose File
                  <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                </Button>
              </Grid>
              
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ height: '56px' }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Product'}
                </Button>
              </Grid>
              
              <Grid item xs={12}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </Paper>
  );
}

export default AddProductForm;