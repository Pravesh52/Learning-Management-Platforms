import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import CourseDetails from "./pages/CourseDetails";
// import WatchCourse from "./pages/WatchCourse";
// import CreateCourse from "./pages/CreateCourse";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

// Protected Route
import PrivateRoute from "./routes/PrivateRoute";
import Pages from "./pages/Pages";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path='/pages'element={<Pages/>}/>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/course/:id" element={<CourseDetails />} /> */}

        {/* Protected Routes */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/watch/:id" element={<WatchCourse />} />
        </Route> */}

        {/* Instructor Only Route */}
        {/* <Route element={<PrivateRoute role="instructor" />}>
          <Route path="/create-course" element={<CreateCourse />} />
        </Route> */}
      </Routes>
      <Pages/>
      <Footer />
    </Router>
  );
}

export default App;