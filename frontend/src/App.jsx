import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Departments from "./pages/Departments";
import DepartmentDetails from "./pages/DepartmentDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Departments */}
        <Route path="/departments" element={<Departments />} />
        <Route
          path="/departments/:slug"
          element={<DepartmentDetails />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;