import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/users/login', { identifier, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.message || 'Błąd logowania');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Logowanie</h2>
      <input type="identifier" placeholder="Login lub email" value={identifier} onChange={e => setIdentifier(e.target.value)} required />
      <input type="password" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit" onClick={handleLogin}>Zaloguj się</button>

    </form>
  );
}
