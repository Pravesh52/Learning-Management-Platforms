
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // Pages
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Pages from "./pages/Pages";
// import Signup from "./pages/Signup";
// import Courses from "./pages/Courses";
// import Dashboard from "./pages/Dashboard";

// // Components
// import Navbar from "./components/Navbar";
// import Footer from "./components/footer";

// // 🔥 Layout
// function Layout() {
//   const location = useLocation();

//   // Dashboard pe footer hide
//   const hideFooter = location.pathname === "/dashboard";

//   return (
//     <>
//       {/* ✅ Navbar hamesha dikhega */}
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/pages" element={<Pages />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/courses" element={<Courses />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>

//       {/* ❌ Dashboard pe footer hide */}
//       {!hideFooter && <Footer />}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pages from "./pages/Pages";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 🔥 Layout control
function Layout() {
  const location = useLocation();

  // 👉 jaha navbar/footer nahi dikhana
  const hideLayout =
    location.pathname === "/dashboard" 
    // location.pathname === "/admin";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ USER DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ✅ ADMIN DASHBOARD */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;