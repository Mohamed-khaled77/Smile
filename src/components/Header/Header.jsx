import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '/src/styles/Components/Header.css'; // سنقوم بتحديث هذا الملف
import { FaCartShopping } from "react-icons/fa6";



function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // هذا الكود يتأكد من حالة تسجيل دخول المستخدم عند تحميل الصفحة
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // هذا الجزء مهم لتحديث الهيدر ديناميكيًا عند تغيير التخزين المحلي
    // (مفيد في التطبيقات الأكبر)
    const handleStorageChange = () => {
        const userFromStorage = localStorage.getItem('user');
        setUser(userFromStorage ? JSON.parse(userFromStorage) : null);
    };

    window.addEventListener('storage', handleStorageChange);

    // تنظيف الـ event listener عند إغلاق المكون
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  return (
    <header className="header-container">
      <div className="header-logo">
        <img  style={{width:"35px"}} src="/public/teeth (2).png" alt="" />
        <Link to="/">Smile 
        </Link>
      </div>

      {/* --- قائمة الروابط الرئيسية --- */}
      <nav className="header-main-nav">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>

      {/* --- الجزء الأيمن من الهيدر --- */}
      <div className="header-right-side">
        {/* 1. زر الشوب أصبح هنا بشكل منفصل */}
        <NavLink to="/shop" style={{color:"#007bff"}} className="shop-button">
          <FaCartShopping />
        </NavLink>

        <div className="header-user-actions">
          {user ? (
            // 2. إذا كان المستخدم مسجل دخوله، أظهر رسالة ترحيب فقط
            <div className="user-info">
              <span>Welcome, {user.name}</span>
            </div>
          ) : (
            // 3. إذا لم يكن مسجل دخوله، أظهر زر الدخول
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;