import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NotFound from "./pages/OtherPage/NotFound";
import SignIn from "./pages/AuthPages/SignIn";
import UserProfiles from "./pages/UserProfiles";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import Home from "./pages/Dashboard/Home";

// Doctors
import AllDoctors from "./pages/Doctors/AllDoctors";
import AddDoctor from "./pages/Doctors/AddDoctor";

// Departments
import AllDepartments from "./pages/Departments/AllDepartments";
import AddDepartment from "./pages/Departments/AddDepartment";

// News
import AllNews from "./pages/News/AllNews";
import AddNews from "./pages/News/AddNews";

// Gallery
import ArchivePhotos from "./pages/Gallery/ArchivePhotos";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import EditDoctor from "./pages/Doctors/EditDoctor";
export default function App() {
  return (
<Router>
  <ScrollToTop />

  <Routes>
    {/* Public Routes */}
    <Route path="/signin" element={<SignIn />} />

    {/* Protected Routes */}
    <Route
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfiles />} />

      <Route path="/doctors" element={<AllDoctors />} />
      <Route
        path="/doctors/create"
        element={<AddDoctor />}
      />
      <Route
        path="/doctors/edit/:id"
        element={<EditDoctor />}
      />
      <Route
        path="/departments"
        element={<AllDepartments />}
      />

      <Route
        path="/departments/create"
        element={<AddDepartment />}
      />

      <Route path="/news" element={<AllNews />} />
      <Route
        path="/news/create"
        element={<AddNews />}
      />

      <Route
        path="/gallery"
        element={<ArchivePhotos />}
      />
    </Route>

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</Router>
  );
}