const express = require('express');
const { createHabit, getHabitById, getHabits, updateHabit, deleteHabit } = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Tworzenie nowego nawyku
router.post('/', authMiddleware, createHabit);

// Pobieranie nawyku po ID
router.get('/:id', authMiddleware, getHabitById);

// Pobieranie listy nawyków
router.get('/', authMiddleware, getHabits);

// Aktualizacja nawyku
router.put('/:id', authMiddleware, updateHabit);

// Usuwanie nawyku
router.delete('/:id', authMiddleware, deleteHabit);

module.exports = router;
