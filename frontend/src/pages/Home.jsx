import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Habit Tracker</h1>
      <p style={styles.description}>
        To aplikacja do śledzenia swoich codziennych nawyków. Rejestruj swoje postępy, monitoruj regularność i osiągaj cele!
      </p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate('/login')}>Zaloguj się</button>
        <button style={styles.button} onClick={() => navigate('/register')}>Zarejestruj się</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  description: {
    fontSize: '18px',
    maxWidth: '600px',
    margin: '20px auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
