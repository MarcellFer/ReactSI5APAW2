import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    alert("Anda telah logout!");
    navigate("/");
  }, []);

  return (
    <div className="container mt-5">
      <p>Logging out...</p>
    </div>
  );
}
