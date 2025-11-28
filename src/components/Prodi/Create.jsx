// Import useState untuk mengelola state
import { useState, useEffect } from "react";
// Import axios untuk melakukan HTTP request
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProdi() {

  // State untuk menyimpan list fakultas (API)
  const [fakultas, setFakultas] = useState([]);
  const navigate = useNavigate();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nama: "",
    singkatan: "",
    fakultas_id: "",
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

    setError(null);

    try {
      // Kirim POST request ke API
      const response = await axios.post(
        "https://newexpresssi5a-weld.vercel.app/api/prodi",
        formData
      );

      console.log("Prodi created:", response.data);
      alert("Data berhasil disimpan!");

      // Reset form setelah berhasil
      setFormData({
        nama: "",
        singkatan: "",
        fakultas_id: "",
      });
      
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

  useEffect(() => {
    // Fungsi async untuk fetch data dari API
    const fetchFakultas = async () => {
      try {
        // Set loading true sebelum fetch data
        setLoading(true);
        // Mengambil data dari API menggunakan axios
        const response = await axios.get(
          "https://newexpresssi5a-weld.vercel.app/api/fakultas"
        );
        // Simpan data yang diterima ke state fakultas
        setFakultas(response.data);
        // Reset error jika fetch berhasil
        setError(null);
      } catch (err) {
        // Jika terjadi error, simpan pesan error ke state
        setError(err.message);
        console.error("Error fetching fakultas:", err);
      } finally {
        // Set loading false setelah proses selesai (berhasil atau gagal)
        setLoading(false);
      }
    };

    // Panggil fungsi fetchFakultas
    fetchFakultas();
  }, []); // Dependency array kosong = hanya dijalankan sekali saat mount


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

        {/* Tampilkan state untuk debugging */}
        <div className="alert alert-info">
        <strong>State saat ini:</strong>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>

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
          <label htmlFor="fakultas_id" className="form-label">
            ID Fakultas
          </label>
          <select name="fakultas_id" id="fakultas_id" value={formData.fakultas_id} onChange={handleChange} className="form-control">
            {fakultas.map((fakultasItem) =>(
              <option key={fakultasItem._id} value={fakultasItem._id}>
                {fakultasItem.nama}
              </option>
            ))}
          </select>
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