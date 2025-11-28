// Import React untuk membuat komponen
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateMahasiswa() {

    // State untuk menyimpan list prodi
    const [prodi, setProdi] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    npm: "",
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    prodi_id: "",
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

    // Fungsi untuk handle submit form
    const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.npm || !formData.nama || !formData.tempat_lahir || !formData.tanggal_lahir) {
      setError("Semua field harus diisi!");
      return;
    }

    // Reset error
    setError(null);

    try {
      // Kirim POST request ke API
      const response = await axios.post(
        "https://newexpresssi5a-weld.vercel.app/api/mahasiswa",
        formData
      );

      console.log("Mahasiswa created:", response.data);
      alert("Data berhasil disimpan!");

      // Reset form setelah berhasil
      setFormData({
        npm: "",
        nama: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        prodi_id: "",
      });

    } catch (err) {
      console.error("Error creating Mahasiswa:", err);
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

    useEffect(() => {
    // Fungsi async untuk fetch data dari API
    const fetchProdi = async () => {
      try {
        // Set loading true sebelum fetch data
        setLoading(true);
        // Mengambil data dari API menggunakan axios
        const response = await axios.get(
          "https://newexpresssi5a-weld.vercel.app/api/prodi"
        );
        // Simpan data yang diterima ke state fakultas
        setProdi(response.data);
        // Reset error jika fetch berhasil
        setError(null);
      } catch (err) {
        // Jika terjadi error, simpan pesan error ke state
        setError(err.message);
        console.error("Error fetching prodi:", err);
      } finally {
        // Set loading false setelah proses selesai (berhasil atau gagal)
        setLoading(false);
      }
    };

    // Panggil fungsi fetch Prodi
    fetchProdi();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Mahasiswa</h2>

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
            NPM
          </label>
          <input
            type="text"
            className="form-control"
            id="npm"
            name="npm"
            value={formData.npm}
            onChange={handleChange}
            placeholder="Contoh: 1234567890"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Mahasiswa
          </label>
          <input
            type="text"
            className="form-control"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Contoh: Nama Anda"
          />
        </div>

        {/* Input field untuk singkatan fakultas */}
        <div className="mb-3">
          <label htmlFor="tempat_lahir" className="form-label">
            Tempat Lahir
          </label>
          <input
            type="text"
            className="form-control"
            id="tempat_lahir"
            name="tempat_lahir"
            value={formData.tempat_lahir}
            onChange={handleChange}
            placeholder="Contoh: Palembang"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tanggal_lahir" className="form-label">
            Tanggal Lahir
          </label>
          <input
            type="date"
            className="form-control"
            id="tanggal_lahir"
            name="tanggal_lahir"
            value={formData.tanggal_lahir}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="prodi_id" className="form-label">
            Prodi
          </label>
          <select name="prodi_id" id="prodi_id" value={formData.prodi_id} onChange={handleChange} className="form-control">
            <option value="">Pilih Prodi</option>
            {prodi.map((prodiItem) =>(
              <option key={prodiItem._id} value={prodiItem._id}>
                {prodiItem.nama}
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
            onClick={() => navigate("/mahasiswa")}
            disabled={loading}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}