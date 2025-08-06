import React, { useEffect, useState } from "react";
import { getProfile } from "../services/fetchs"; // asegúrate que esté bien importado
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // <-- aquí tomas el token guardado
    if (!token) {
      navigate("/login"); // si no hay token, redirige
      return;
    }

    getProfile(token).then((data) => {
      if (data) {
        setUser(data); // <--- aquí guardas los datos del usuario
      } else {
        console.log("No se pudo cargar el perfil");
        navigate("/login");
      }
    });
  }, []);

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Perfil del Usuario</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
