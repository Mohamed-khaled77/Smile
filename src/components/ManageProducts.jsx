import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // 1. استدعاء المكتبة الجديدة

import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Button, 
    Typography, Box, CircularProgress, Alert 
} from '@mui/material';

function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    // ... (هذه الدالة تبقى كما هي)
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost/dental_api/get_products.php');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  // --- 2. دالة الحذف الجديدة باستخدام SweetAlert2 ---
  const handleDelete = (productId) => {
    // عرض المودل الاحترافي
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // 3. هذا الكود يتم تنفيذه بعد أن يختار المستخدم قراره
      if (result.isConfirmed) {
        // إذا ضغط المستخدم "Yes"، قم بتنفيذ عملية الحذف
        const formData = new FormData();
        formData.append('id', productId);
        
        axios.post('http://localhost/dental_api/delete_product.php', formData)
          .then(() => {
            // تحديث الواجهة مباشرة
            setProducts(products.filter(p => p.id !== productId));
            // عرض رسالة نجاح
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            );
          })
          .catch(err => {
            console.error("Error deleting product:", err);
            Swal.fire(
              'Error!',
              'Failed to delete the product.',
              'error'
            );
          });
      }
    });
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* ... (الجزء العلوي كما هو) ... */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <Typography variant="h5" component="div">Manage Products</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/dashboard/products/add')}>
          Add New Product
        </Button>
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow hover key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>EGP {product.price}</TableCell>
                <TableCell>
                  <img 
                    src={`http://localhost/dental_api/${product.image_url}`} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>Edit</Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ManageProducts;