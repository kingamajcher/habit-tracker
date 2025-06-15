import React, { useState } from 'react';

const weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

export default function HabitCalendar({ logs }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  let firstDay = new Date(year, month, 1).getDay();
  firstDay = (firstDay + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = Array.from({ length: daysInMonth }, (_, i) =>
    new Date(year, month, i + 1).toISOString().slice(0, 10)
  );

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const goToPreviousMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  return (
    <div>
      <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <button onClick={goToPreviousMonth}>←</button>
        {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {year}
        <button onClick={goToNextMonth}>→</button>
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        {weekDays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
        marginTop: '5px'
      }}>
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {dates.map(dateStr => (
          <div
            key={dateStr}
            style={{
              padding: '10px',
              backgroundColor: logs.includes(dateStr) ? '#206648' : '#575757',
              border: '1px solid #878787',
              textAlign: 'center',
              borderRadius: '4px'
            }}
          >
            {Number(dateStr.slice(8, 10))}
          </div>
        ))}
      </div>
    </div>
  );
}
