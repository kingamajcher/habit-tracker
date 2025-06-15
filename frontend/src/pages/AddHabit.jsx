import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AddHabit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddHabit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Musisz być zalogowany');

      const res = await API.post('/api/habits', { name, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Nawyk dodany pomyślnie!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Błąd podczas dodawania nawyku');
    }
  };

  return (
    <div>
      <h2>Dodaj nowy nawyk</h2>
      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          placeholder="Nazwa nawyku"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Opis (opcjonalnie)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" onClick={handleAddHabit}>Dodaj</button>
      </form>
    </div>
  );
}
