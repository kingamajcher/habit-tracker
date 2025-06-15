import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';
import HabitCalendar from '../components/HabitCalendar';

export default function HabitDetails() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logs, setLogs] = useState([]);
  const [logDate, setLogDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitAndLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [habitRes, logsRes] = await Promise.all([
          API.get(`/api/habits/${id}`, { headers }),
          API.get(`/api/habitlogs/${id}`, { headers })
        ]);

        setHabit(habitRes.data);
        setName(habitRes.data.name);
        setDescription(habitRes.data.description);

        const logDates = logsRes.data
          .filter(log => log.status === 'done')
          .map(log => log.date.slice(0, 10));

        setLogs(logDates);
      } catch (err) {
        console.error('Błąd przy pobieraniu danych:', err);
      }
    };

    fetchHabitAndLogs();
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
    } catch {
      alert('Błąd przy aktualizacji');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten nawyk?')) return;
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/api/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Nawyk usunięty');
      navigate('/dashboard');
    } catch {
      alert('Błąd przy usuwaniu nawyku');
    }
  };

  const handleLog = async () => {
    if (!logDate) return alert('Wybierz datę');
    try {
      const token = localStorage.getItem('token');
      const res = await API.post(`/api/habitlogs`, {
        habitId: id,
        status: 'done',
        date: logDate,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Zalogowano wykonanie!');

      setLogs(prev => [...prev, logDate]);
      setLogDate('');
    } catch (err) {
      alert('Błąd przy logowaniu wykonania');
      console.error(err);
    }
  };

  const calculateStreak = (logDates) => {
    const logsSet = new Set(logDates);
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    while (true) {
      const dateStr = today.toISOString().slice(0, 10);
      if (logsSet.has(dateStr)) {
        streak++;
        today.setDate(today.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  if (!habit) return <p>Ładowanie...</p>;

  const streak = calculateStreak(logs);
  const todayStr = new Date().toLocaleDateString('sv-SE');


  return (
    <div>
      <h2>Szczegóły nawyku</h2>

      {!isEditing ? (
        <>
          <p><strong>Nazwa:</strong> {habit.name}</p>
          <p><strong>Opis:</strong> {habit.description || 'Brak opisu'}</p>
          <button onClick={() => setIsEditing(true)}>Edytuj</button>
          <button onClick={handleDelete} style={{ marginLeft: '1rem' }}>Usuń nawyk</button>

          <hr style={{ margin: '1rem 0' }} />

          <h3>Logowanie wykonania</h3>
          <input
            type="date"
            value={logDate}
            onChange={e => setLogDate(e.target.value)}
            max={todayStr}
          />

          <button onClick={handleLog} style={{ marginLeft: '0.5rem' }}>Zaloguj wykonanie</button>

          <h4>Dni z rzędu: {streak}</h4>

          <HabitCalendar logs={logs} />
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Nazwa:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label>Opis:</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
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
