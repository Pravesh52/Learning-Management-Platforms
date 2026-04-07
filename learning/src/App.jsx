// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Pages
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import Dashboard from "./pages/Dashboard";
// // import CourseDetails from "./pages/CourseDetails";
// // import WatchCourse from "./pages/WatchCourse";
// // import CreateCourse from "./pages/CreateCourse";

// // Components
// import Navbar from "./components/Navbar";
// import Footer from "./components/footer";

// // Protected Route
// import PrivateRoute from "./routes/PrivateRoute";
// import Pages from "./pages/Pages";
// import Signup from "./pages/Signup";
// import Courses from "./pages/Courses";

// function App() {
//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path='/pages'element={<Pages/>}/>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/course"element={<Courses/>}/>
//         <Route path="/contact" element={<Footer />} />
//         {/* <Route path="/footer" element={<Footer/>}/> */}
//         {/* <Route path="/course/:id" element={<CourseDetails />} /> */}

//         {/* Protected Routes */}
//         {/* <Route element={<PrivateRoute />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/course/watch/:id" element={<WatchCourse />} />
//         </Route> */}

//         {/* Instructor Only Route */}
//         {/* <Route element={<PrivateRoute role="instructor" />}>
//           <Route path="/create-course" element={<CreateCourse />} />
//         </Route> */}
//       </Routes>
//       <Pages/>
//       <Footer />
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pages from "./pages/Pages";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        {/* <Route path="/footer" element={<Footer/>}/> */}
      </Routes>

      {/* Footer har page pe show hoga */}
      <Footer />
    </Router>
  );
}

export default App;