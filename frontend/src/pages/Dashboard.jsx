import { useState } from 'react';
import HabitList from '../components/HabitList';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddHabit = () => {
    navigate("/add-habit");
  };

  const handleSearch = () => {
    setSearchTerm(inputValue.trim());
  };

  return (
    <div>
      <h1>Twoje Nawyki</h1>

      <div>
        <input
          type="text"
          placeholder="Szukaj nawyku..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="border p-2 rounded w-full max-w-sm mb-2"
        />
        <button 
          onClick={handleSearch} 
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Szukaj
        </button>
      </div>

      <button onClick={handleAddHabit} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
        Dodaj nawyk
      </button>

      <HabitList searchTerm={searchTerm} />
    </div>
  );
}
