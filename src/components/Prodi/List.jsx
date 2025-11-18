// Import hooks dari React untuk state management dan side effects
import { useState, useEffect } from "react";
// Import axios untuk melakukan HTTP request ke API
import axios from "axios";

export default function ProdiList() {
  // State untuk menyimpan data fakultas dari API
  const [prodi, setProdi] = useState([]);
  // State untuk menandakan proses loading data
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan pesan error jika terjadi kesalahan
  const [error, setError] = useState(null);

  // useEffect akan dijalankan sekali saat komponen pertama kali di-render
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

    // Panggil fungsi fetchFakultas
    fetchProdi();
  }, []); // Dependency array kosong = hanya dijalankan sekali saat mount

  // Tampilkan pesan loading jika data masih diambil
  if (loading) return <div>Loading...</div>;
  // Tampilkan pesan error jika ada kesalahan
  if (error) return <div>Error: {error}</div>;

  // Render tabel fakultas jika data sudah tersedia
  return (
    <div>
      <h1>Prodi List</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Singkatan</th>
            <th>Fakultas</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop data fakultas dan tampilkan dalam baris tabel */}
          {prodi.map((pro) => (
            // key={fak._id} untuk identifikasi unik setiap baris
            <tr key={pro._id}>
              <td>{pro.nama}</td>
              <td>{pro.singkatan}</td>
              <td>{pro.fakultas_id.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
