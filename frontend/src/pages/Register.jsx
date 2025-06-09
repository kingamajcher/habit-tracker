import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/users/register', { email, password, username });
      alert('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
      navigate('/login');
      console.log('Rejestracja zakończona sukcesem', { email, username });
    } catch (err) {
      alert(err.response?.data?.message || 'Błąd rejestracji');
      console.error('Błąd rejestracji', err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Rejestracja</h2>
      <input
        type="text"
        placeholder="Nazwa użytkownika"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Adres e-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" onClick={handleRegister} >Zarejestruj się</button>
    </form>
  );
}
