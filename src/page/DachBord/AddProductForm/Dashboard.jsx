import React from 'react';
import { Grid, Box } from '@mui/material'; // مكتبة MUI لتقسيم الصفحة
import { Outlet } from 'react-router-dom'; // من الراوتر لعرض المحتوى المتغير
import DashboardSidebar from '/src/components/DashboardSidebar.jsx'; // استدعاء الشريط الجانبي





function Dashboard() {
  // 1. تحديد عرض ثابت للشريط الجانبي بالبيكسل
  const sidebarWidth = 280;

  return (
    // 2. استخدام Box مع display: 'flex' لإنشاء الهيكل الرئيسي
    <Box sx={{ display: 'flex' }}>

      {/* --- الشريط الجانبي (بعرض ثابت) --- */}
      <Box
        component="nav"
        sx={{
          // العرض سيكون ثابتاً على الشاشات المتوسطة والكبيرة
          width: { md: sidebarWidth },
          // هذا يمنع الشريط الجانبي من الانكماش
          flexShrink: { md: 0 }
        }}
      >
        <DashboardSidebar />
      </Box>

      {/* --- المحتوى الرئيسي (بعرض مرن) --- */}
      <Box
        component="main"
        sx={{
          // 3. هذا هو الجزء الأهم: flexGrow: 1
          // هذا يخبر الصندوق بأن "ينمو" ليملأ أي مساحة متبقية
          flexGrow: 1,
          padding: 3, // padding: '24px'
          // حساب العرض المتبقي لضمان عدم التداخل
          width: { md: `calc(100% - ${sidebarWidth}px)` },
        }}
      >
        {/* سيتم وضع المحتوى (مثل نموذج إضافة المنتج) هنا بشكل منظم */}
        <Outlet />
      </Box>

    </Box>
  );
}

export default Dashboard;