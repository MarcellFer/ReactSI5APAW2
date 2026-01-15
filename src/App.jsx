// import React mengimpor modul React dari pustaka react.
// authmiddleware untuk login baru bisa dihapus
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
// { Suspense } mengimpor komponen Suspense dari pustaka React. Suspense digunakan untuk menunda rendering komponen hingga data atau kode yang diperlukan telah siap.
import React, { Suspense, useState } from "react";

// Biasanya, Suspense digunakan bersama React.lazy() untuk mendukung pemuatan (loading) komponen secara dinamis (lazy loading).
// Import Component
const Home = React.lazy(() => import("./components/Home"));
const Login = React.lazy(() => import("./components/Login"));
const Logout = React.lazy(() => import("./components/Logout"));
const FakultasList = React.lazy(() => import("./components/Fakultas/List"));
const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"));
const FakultasEdit = React.lazy(() => import("./components/Fakultas/Edit"));
const ProdiList = React.lazy(() => import("./components/Prodi/List"));
const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"));
const MahasiswaList = React.lazy(() => import("./components/Mahasiswa/List"));
const MahasiswaCreate = React.lazy(() => import("./components/Mahasiswa/Create"));

// Komponen ProtectedRoute untuk melindungi rute yang memerlukan login
const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      Navbar
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">
            Home
          </NavLink>
        </li>
        {isAuthenticated && (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/fakultas">
                Fakultas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/prodi">
                Program Studi
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/mahasiswa">
                Mahasiswa
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <ul className="navbar-nav ms-auto">
        {isAuthenticated ? (
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
        ) : (
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          {/* Protected Routes */}
          <Route path="/fakultas" element={<ProtectedRoute element={<FakultasList />} isAuthenticated={isAuthenticated} />} />
          <Route path="/fakultas/create" element={<ProtectedRoute element={<FakultasCreate />} isAuthenticated={isAuthenticated} />} />
          <Route path="/fakultas/edit/:id" element={<ProtectedRoute element={<FakultasEdit />} isAuthenticated={isAuthenticated} />} />
          <Route path="/prodi" element={<ProtectedRoute element={<ProdiList />} isAuthenticated={isAuthenticated} />} />
          <Route path="/prodi/create" element={<ProtectedRoute element={<ProdiCreate />} isAuthenticated={isAuthenticated} />} />
          <Route path="/mahasiswa" element={<ProtectedRoute element={<MahasiswaList />} isAuthenticated={isAuthenticated} />} />
          <Route path="/mahasiswa/create" element={<ProtectedRoute element={<MahasiswaCreate />} isAuthenticated={isAuthenticated} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;