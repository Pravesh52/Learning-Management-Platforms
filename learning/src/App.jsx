import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Layout Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Context
import { CartProvider } from "./context/CartContext";

// Public Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Branches from "./pages/Branches";
import Notes from "./pages/Notes";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ManagementCareers from "./pages/ManagementCareers";
import FacultyCareers from "./pages/FacultyCareers";
import InvestWithUs from "./pages/InvestWithUs";
import Franchise from "./pages/Franchise";

// Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

function Layout() {
  const location = useLocation();

  // Header/Footer hide on Dashboard and Admin pages (they have their own layout)
  const hideLayout =
    location.pathname === "/dashboard" || location.pathname === "/admin";

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        {/* ===== PUBLIC PAGES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/careers/management" element={<ManagementCareers />} />
        <Route path="/careers/faculty" element={<FacultyCareers />} />
        <Route path="/invest-with-us" element={<InvestWithUs />} />
        <Route path="/franchise" element={<Franchise />} />

        {/* ===== AUTH PAGES ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ===== STUDENT DASHBOARD (Protected) ===== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ===== ADMIN DASHBOARD (Protected) ===== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout />
      </CartProvider>
    </Router>
  );
}

export default App;