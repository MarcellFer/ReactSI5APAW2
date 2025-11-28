// import React mengimpor modul React dari pustaka react.
// authmiddleware untuk login baru bisa dihapus
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// { Suspense } mengimpor komponen Suspense dari pustaka React. Suspense digunakan untuk menunda rendering komponen hingga data atau kode yang diperlukan telah siap.
import React, { Suspense } from "react";

// Biasanya, Suspense digunakan bersama React.lazy() untuk mendukung pemuatan (loading) komponen secara dinamis (lazy loading).
// Import Component
const Home = React.lazy(() => import("./components/Home"));
const FakultasList = React.lazy(() => import("./components/Fakultas/List"));
const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"));
const ProdiList = React.lazy(() => import("./components/Prodi/List"));
const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"));
const MahasiswaList = React.lazy(() => import("./components/Mahasiswa/List"));
const MahasiswaCreate = React.lazy(() => import("./components/Mahasiswa/Create"));


function App() {
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
      </ul>
    </div>
  </div>
</nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fakultas" element={<FakultasList />} />
          <Route path="/fakultas/create" element={<FakultasCreate />} />
          <Route path="/prodi" element={<ProdiList />} />
          <Route path="/prodi/create" element={<ProdiCreate />} />
          <Route path="/mahasiswa" element={<MahasiswaList />} />
          <Route path="/mahasiswa/create" element={<MahasiswaCreate />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;