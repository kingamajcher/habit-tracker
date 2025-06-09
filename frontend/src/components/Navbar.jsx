import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <button onClick={() => navigate('/')}>Strona główna</button>
      <button onClick={() => navigate('/profile')}>Profil</button>
      <button onClick={handleLogout}>Wyloguj</button>
    </nav>
  );
}
