import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';

// مكون صغير لبطاقة الإحصائيات لتجنب التكرار
const StatCard = ({ icon, title, value, color }) => (
  <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
    <Box sx={{ marginRight: 2, color: color }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
      <Typography color="text.secondary">
        {title}
      </Typography>
    </Box>
  </Card>
);


function DashboardStats() {
  // State لتخزين البيانات وحالات التحميل والخطأ
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost/dental_api/get_stats.php');
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // عرض مؤشر تحميل
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  // عرض رسالة خطأ
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      {/* حاوية لبطاقات الإحصائيات */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<InventoryIcon sx={{ fontSize: 40 }} />} 
            title="Total Products"
            value={stats.totalProducts}
            color="#007bff"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<PeopleIcon sx={{ fontSize: 40 }} />} 
            title="Total Users"
            value={stats.totalUsers}
            color="#28a745"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<CategoryIcon sx={{ fontSize: 40 }} />} 
            title="Total Categories"
            value={stats.totalCategories}
            color="#ffc107"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<ReceiptIcon sx={{ fontSize: 40 }} />} 
            title="Total Orders"
            value={stats.totalOrders}
            color="#dc3545"
          />
        </Grid>
      </Grid>
      
      {/* يمكنك إضافة رسوم بيانية هنا لاحقًا */}
      <Box mt={5}>
        <Typography variant="h5">Sales Analytics (Coming Soon)</Typography>
        {/* <YourChartComponent /> */}
      </Box>
    </Box>
  );
}

export default DashboardStats;