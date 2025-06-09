const express = require('express');
const { createHabitLog, getHabitLogs, updateHabitLog, deleteHabitLog } = require('../controllers/habitLogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Tworzenie logu
router.post('/', authMiddleware, createHabitLog);

// Pobieranie logów nawyku
router.get('/:habitId', authMiddleware, getHabitLogs);  

// Aktualizacja logu
router.put('/:id', authMiddleware, updateHabitLog);  

// Usunięcie logu
router.delete('/:id', authMiddleware, deleteHabitLog);  

module.exports = router;
