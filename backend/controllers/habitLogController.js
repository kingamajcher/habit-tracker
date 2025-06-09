const mongoose = require('mongoose');
const HabitLog = require('../models/HabitLog');
const Habit = require('../models/Habit');

const ALLOWED_STATUSES = ['done', 'not done'];

// Tworzenie logu nawyku
const createHabitLog = async (req, res) => {
  const { habitId } = req.body;
  const status = req.body.status || 'not done';

  if (!habitId) {
    return res.status(400).json({ message: 'Brak habitId' });
  }

  if (!mongoose.Types.ObjectId.isValid(habitId)) {
    return res.status(400).json({ message: 'Nieprawidłowy format habitId' });
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ message: `Nieprawidłowy status. Dozwolone: ${ALLOWED_STATUSES.join(', ')}` });
  }

  try {
    const habit = await Habit.findById(habitId);
    if (!habit) return res.status(404).json({ message: 'Nawyk nie znaleziony' });

    if (habit.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Brak uprawnień' });
    }

    const log = new HabitLog({ habit: habitId, status });
    await log.save();
    res.status(201).json({ message: 'Log nawyku utworzony', log });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Pobranie logów dla nawyku
const getHabitLogs = async (req, res) => {
  const { habitId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(habitId)) {
    return res.status(400).json({ message: 'Nieprawidłowy format habitId' });
  }

  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ message: 'Nawyk nie znaleziony' });
    }

    if (habit.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Brak dostępu do logów tego nawyku' });
    }

    const logs = await HabitLog.find({ habit: habitId });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Aktualizacja logu nawyku
const updateHabitLog = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Nieprawidłowy format ID logu' });
  }

  if (!status) {
    return res.status(400).json({ message: 'Brak statusu' });
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ message: `Nieprawidłowy status. Dozwolone: ${ALLOWED_STATUSES.join(', ')}` });
  }

  try {
    const log = await HabitLog.findById(id);
    if (!log) {
      return res.status(404).json({ message: 'Log nie znaleziony' });
    }

    const habit = await Habit.findById(log.habit);
    if (!habit || habit.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Brak uprawnień do aktualizacji logu' });
    }

    log.status = status;
    await log.save();
    res.json({ message: 'Log nawyku zaktualizowany', log });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Usunięcie logu nawyku
const deleteHabitLog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Nieprawidłowy format ID logu' });
  }

  try {
    const log = await HabitLog.findById(id);
    if (!log) {
      return res.status(404).json({ message: 'Log nie znaleziony' });
    }

    const habit = await Habit.findById(log.habit);
    if (!habit || habit.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Brak uprawnień do usunięcia logu' });
    }

    await HabitLog.deleteOne({ _id: id });
    res.json({ message: 'Log nawyku usunięty' });
  } catch (error) {
    console.error('Błąd przy usuwaniu logu:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};


module.exports = { createHabitLog, getHabitLogs, updateHabitLog, deleteHabitLog };
