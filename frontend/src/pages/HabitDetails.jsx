import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function HabitDetails() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/api/habits/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHabit(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
      } catch (err) {
        console.error('Błąd przy pobieraniu szczegółów nawyku:', err);
      }
    };
    fetchHabit();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.put(`/api/habits/${id}`, { name, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Nawyk zaktualizowany!');
      setIsEditing(false);
      setHabit(prev => ({ ...prev, name, description }));
    } catch (err) {
      alert('Błąd przy aktualizacji');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Czy na pewno chcesz usunąć ten nawyk?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await API.delete(`/api/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Nawyk usunięty');
      navigate('/dashboard');
    } catch (err) {
      alert('Błąd przy usuwaniu nawyku');
    }
  };

  if (!habit) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Szczegóły nawyku</h2>

      {!isEditing ? (
        <>
          <p><strong>Nazwa:</strong> {habit.name}</p>
          <p><strong>Opis:</strong> {habit.description || 'Brak opisu'}</p>
          <button onClick={() => setIsEditing(true)}>Edytuj</button>
          <button onClick={handleDelete} style={{ marginLeft: '1rem' }}>Usuń nawyk</button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Nazwa:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Opis:</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">Zapisz zmiany</button>
          <button type="button" onClick={() => setIsEditing(false)} style={{ marginLeft: '1rem' }}>
            Anuluj
          </button>
        </form>
      )}
    </div>
  );
}
