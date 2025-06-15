import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

export default function HabitList() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/api/habits', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHabits(res.data.habits);
      } catch (err) {
        console.error('Błąd przy pobieraniu nawyków:', err);
      }
    };
    fetchHabits();
  }, []);

  return (
    <ul>
      {habits.map(habit => (
        <li key={habit._id}>
          <Link to={`/habits/${habit._id}`}>
            <strong>{habit.name}</strong>
          </Link>
        </li>
      ))}
    </ul>
  );
}
