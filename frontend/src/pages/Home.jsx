import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Habit Tracker</h1>
      <p>
        To aplikacja do śledzenia swoich codziennych nawyków. Rejestruj swoje postępy, monitoruj regularność i osiągaj cele!
      </p>
    </div>
  );
}
