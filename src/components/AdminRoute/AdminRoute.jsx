import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  // 1. احصل على بيانات المستخدم من التخزين المحلي (localStorage)
  const userString = localStorage.getItem('user');
  
  // 2. تحقق إذا كان هناك مستخدم مسجل دخوله وإذا كان دوره "admin"
  let isAdmin = false;
  if (userString) {
    try {
      const user = JSON.parse(userString);
      // تأكد أن المستخدم موجود وأن دوره هو "admin"
      if (user && user.role === 'admin') {
        isAdmin = true;
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      isAdmin = false;
    }
  }

  // 3. اتخذ القرار
  // إذا كان أدمن، اسمح له بالوصول للمكون المطلوب (مثل الداش بورد) عن طريق <Outlet />
  // إذا لم يكن أدمن، قم بإعادة توجيهه لصفحة الدخول
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;