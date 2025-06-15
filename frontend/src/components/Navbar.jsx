import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav>
      <button onClick={() => navigate('/')}>Strona główna</button>

      {isLoggedIn ? (
        <>
          <button onClick={() => navigate('/profile')}>Profil</button>
          <button onClick={() => navigate('/dashboard')}>Nawyki</button>
          <button onClick={handleLogout}>Wyloguj</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>Zaloguj</button>
          <button onClick={() => navigate('/register')}>Zarejestruj</button>
        </>
      )}
    </nav>
  );
}
