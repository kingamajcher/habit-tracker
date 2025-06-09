import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function HabitLogs({ habitId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get(`/api/logs/${habitId}`);
        setLogs(res.data.logs || []);
      } catch (err) {
        console.error('Błąd podczas pobierania logów:', err);
      }
    };

    if (habitId) fetchLogs();
  }, [habitId]);

  if (!habitId) return <p>Nie wybrano nawyku.</p>;

  return (
    <div>
      <h3>Logi nawyku</h3>
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            {new Date(log.date).toLocaleDateString()} – {log.note || 'Bez notatki'}
          </li>
        ))}
      </ul>
    </div>
  );
}
