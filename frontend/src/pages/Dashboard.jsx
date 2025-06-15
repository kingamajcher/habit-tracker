import HabitList from '../components/HabitList';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleAddHabit = () => {
    navigate("/add-habit");
  };

  return (
    <div>
      <h1>Twoje Nawyki</h1>
        <button onClick={handleAddHabit} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Dodaj nawyk
      </button>
      <HabitList />
    </div>
  );
}
