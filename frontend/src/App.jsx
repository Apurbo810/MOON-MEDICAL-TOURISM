import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Home from "./pages/Home";
import About from "./pages/About";
import Departments from "./pages/Departments";
import DepartmentDetails from "./pages/DepartmentDetails";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Contact from "./pages/Contact"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/departments" element={<Departments />} />

        <Route
          path="/departments/:slug"
          element={<DepartmentDetails />}
        />

        <Route path="/doctors" element={<Doctors />} />

        <Route
          path="/doctors/:id"
          element={<DoctorProfile />}
        />
        <Route
          path="/news"
          element={<News />}
        />

        <Route
          path="/news/:slug"
          element={<NewsDetails />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;