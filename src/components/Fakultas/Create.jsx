// Import React untuk membuat komponen
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CreateFakultas() {

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nama: "",
    singkatan: "",
  });


  // Fungsi untuk handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    // State untuk menyimpan pesan error
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fungsi untuk handle submit form
    const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.nama || !formData.singkatan) {
      setError("Semua field harus diisi!");
      return;
    }

    // Reset error
    setError(null);

    try {
      // Kirim POST request ke API
      const response = await axios.post(
        "https://newexpresssi5a-weld.vercel.app/api/fakultas",
        formData
      );

      console.log("Fakultas created:", response.data);
      alert("Data berhasil disimpan!");

      // Reset form setelah berhasil
      setFormData({
        nama: "",
        singkatan: "",
      });
    } catch (err) {
      console.error("Error creating fakultas:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat menyimpan data"
      );
    } finally {
      setLoading(false);
    }
  };

    // Simulasi berhasil
    // alert("Validasi berhasil! Data siap dikirim.");
    // console.log("Data yang akan dikirim:", formData);
    // };

  // Render form sederhana
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Fakultas</h2>

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

      {/* Form untuk input data fakultas */}
      <form onSubmit={handleSubmit}>
        {/* Input field untuk nama fakultas */}
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Fakultas
          </label>
          <input
            type="text"
            className="form-control"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Contoh: Fakultas Teknik"
          />
        </div>

        {/* Input field untuk singkatan fakultas */}
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
            placeholder="Contoh: FT"
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/fakultas")}
            disabled={loading}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}