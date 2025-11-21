// Import useState untuk mengelola state
import { useState } from "react";
// Import axios untuk melakukan HTTP request
import axios from "axios";
// Import useNavigate untuk navigasi
import { useNavigate } from "react-router-dom";

export default function CreateProdi() {
  // useNavigate hook untuk redirect
  const navigate = useNavigate();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nama: "",
    singkatan: "",
  });

  // State untuk menyimpan pesan error
  const [error, setError] = useState(null);

  // State untuk menandakan proses loading
  const [loading, setLoading] = useState(false);

  // Fungsi untuk handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.nama || !formData.singkatan) {
      setError("Semua field harus diisi!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Kirim POST request ke API
      const response = await axios.post(
        "https://newexpresssi5a-weld.vercel.app/api/prodi",
        formData
      );

      console.log("Prodi created:", response.data);

      // Redirect ke halaman list prodi
      navigate("/prodi");
    } catch (err) {
      console.error("Error creating prodi:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat menyimpan data"
      );
    } finally {
      setLoading(false);
    }
  };

  // Render form dengan navigasi
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Prodi</h2>

      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Prodi
          </label>
          <input
            type="text"
            className="form-control"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Contoh: Sistem Informasi"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="singkatan" className="form-label">
            Singkatan
          </label>
          <input
            type="text"
            className="form-control"
            id="singkatan"
            name="singkatan"
            value={formData.singkatan}
            onChange={handleChange}
            placeholder="Contoh: SI"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Fakultas
          </label>
          <input
            type="text"
            className="form-control"
            id="fakultas_id"
            name="fakultas_id"
            value={formData.fakultas_id}
            onChange={handleChange}
            placeholder="Contoh: Fakultas Teknik"
            disabled={loading}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/prodi")}
            disabled={loading}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}