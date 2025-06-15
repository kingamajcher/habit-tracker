import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Nie udało się pobrać danych użytkownika");
        }
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  if (!user) {
    return <p>Ładowanie profilu...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profil użytkownika</h2>
      <p><strong>Nazwa użytkownika:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
