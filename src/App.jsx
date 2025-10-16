import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// استدعاء المكونات الرئيسية والصفحات
import Header from "./components/Header/Header";
import Home from "./page/Home/Home";
import Login from "./page/log/LogIn";
import Register from "./page/log/Register";
import Shop from "./page/Shop/Shop";
import About from "./page/About/About";
import Contact from "./page/ContactUs/Contact";

// استدعاء مكون الحماية
import AdminRoute from "./components/AdminRoute/AdminRoute";

// --- 1. استدعاء مكونات الداش بورد الجديدة ---
// تأكد من أن هذه المسارات صحيحة بناءً على هيكل مشروعك
import Dashboard from "./page/DachBord/AddProductForm/Dashboard";
import DashboardStats from "./components/DashboardStats";
import ManageProducts from "./components/ManageProducts";
import AddProductForm from "./page/DachBord/AddProductForm/AddProductForm";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main style={{ padding: "20px" }}>
          <Routes>
            {/* --- المسارات العامة (تبقى كما هي) --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* --- المسارات المحمية للأدمن فقط (تم تعديلها) --- */}
            <Route element={<AdminRoute />}>
              {/* 2. هذا هو المسار الأب للداش بورد */}
              <Route path="/dashboard" element={<Dashboard />}>
                
                {/* 3. تعريف المسارات الفرعية (الأبناء) داخل الداش بورد */}

                {/* المسار الافتراضي: عند الدخول لـ /dashboard، سينقلك تلقائيًا إلى /dashboard/stats */}
                <Route index element={<Navigate to="stats" replace />} />
                
                {/* مسار الإحصائيات */}
                <Route path="stats" element={<DashboardStats />} />
                
                {/* مسار إدارة المنتجات */}
                <Route path="products" element={<ManageProducts />} />

                {/* مسار إضافة منتج جديد */}
                <Route path="products/add" element={<AddProductForm />} />

                {/* يمكنك إضافة مسار إدارة المستخدمين هنا لاحقًا */}
                {/* <Route path="users" element={<ManageUsers />} /> */}
              </Route>
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;