import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function HabitList() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await API.get('/api/habits');
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
          <strong>{habit.name}</strong> – {habit.description}
        </li>
      ))}
    </ul>
  );
}
