import { useState } from 'react';
import API from '../api/axios';

export default function HabitForm({ onHabitCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/habits', { name, description });
      onHabitCreated(res.data.habit); // przekazanie nowego nawyku do listy
      setName('');
      setDescription('');
    } catch (err) {
      alert(err.response.data.message || 'Błąd tworzenia nawyku');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nazwa nawyku" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Opis" />
      <button type="submit">Dodaj</button>
    </form>
  );
}
