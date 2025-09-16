// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import AdminRoute from "./routes/AdminRoute";

// // Public Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Menu from "./pages/Menu";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";

// // Auth Pages
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";

// // User Pages
// import Profile from "./pages/user/Profile";
// import Orders from "./pages/user/Orders";
// import UserDashboard from "./pages/user/Dashboard";

// // Admin Pages
// import AdminDashboard from "./pages/admin/Dashboard";
// import Users from "./pages/admin/Users";
// import Analytics from "./pages/admin/Analytics";

// // Other
// import EditProfile from "./pages/EditProfile";
// import BookTable from "./pages/BookTable";
// import LiveMusicPage from "./pages/LiveMusicPage"; // ✅ New Live Music Page


// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/menu" element={<Menu />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* New Pages */}
//           <Route path="/book-table" element={<BookTable />} /> {/* ✅ */}
//           <Route path="/live-music" element={<LiveMusicPage />} /> {/* ✅ */}

//           {/* User Protected Routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/user" element={<UserDashboard />} />
//             <Route path="/user/profile" element={<Profile />} />
//             <Route path="/user/orders" element={<Orders />} />
//           </Route>

//           {/* Admin Protected Routes */}
//           <Route element={<AdminRoute />}>
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/admin/users" element={<Users />} />
//             <Route path="/admin/analytics" element={<Analytics />} />
//           </Route>

//           {/* Profile Edit */}
//           <Route path="/profile/edit" element={<EditProfile />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// User Pages
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import UserDashboard from "./pages/user/Dashboard";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Analytics from "./pages/admin/Analytics";

// Other
import EditProfile from "./pages/EditProfile";
import BookTable from "./pages/BookTable";

//Service Ordering Pages

import LiveMusicPage from "./pages/LiveMusicPage"; // ✅ New Live Music Page
import OnlineOrderingPage from "./pages/OnlineOrderingPage"; // ✅ New Online Ordering Page
import DineInServicePage from "./pages/Dine-In-ServicePage"; // ✅ New Dine-In Service Page
import SeasonalSpecialsPage from "./pages/SeasonalSpecialsPage"; // ✅ New Seasonal Specials Page

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Services Ordering Routes */}
          <Route path="/book-service/8" element={<LiveMusicPage />} /> {/* ✅ Live Music at /book-service/8 */}
          <Route path="/book-service/3" element={<OnlineOrderingPage />} /> {/* ✅ Online Ordering Page */}
          <Route path="/book-service/1" element={<DineInServicePage />} /> {/* ✅ Dine-In Service Page */}
          <Route path="/book-service/9" element={<SeasonalSpecialsPage />} /> {/* ✅ Seasonal Specials Page */}

          <Route path="/book-table" element={<BookTable />} /> {/* ✅ */}
          {/* User Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/orders" element={<Orders />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Route>

          {/* Profile Edit */}
          <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
