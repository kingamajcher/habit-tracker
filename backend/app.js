const express = require('express');
const connectDB = require('./config/db');
const User = require('./models/User');
const Habit = require('./models/Habit');
const HabitLog = require('./models/HabitLog');
const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');
const habitLogRoutes = require('./routes/habitLogRoutes');

require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(require('cors')());

app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/habitlogs', habitLogRoutes);

// Endpoint testowy serwera
app.get('/', (req, res) => {
  res.send('Serwer działa!');
});

const PORT = process.env.PORT || 5000;

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
