const Habit = require('../models/Habit');

const mongoose = require('mongoose');

const ALLOWED_SORT_FIELDS = ['createdAt', 'name'];

// Tworzenie nowego nawyku
const createHabit = async (req, res) => {
  const { name, description } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Nazwa jest wymagana' });
  }

  if (name.length > 100) {
    return res.status(400).json({ message: 'Nazwa nawyku nie może mieć więcej niż 100 znaków' });
  }

  if (description && description.length > 500) {
    return res.status(400).json({ message: 'Opis nie może mieć więcej niż 500 znaków' });
  }

  try {
    const newHabit = new Habit({ name, description, owner: req.user.id });
    await newHabit.save();
    res.status(201).json({ message: 'Nawyk utworzony', habit: newHabit });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};


// Pobieranie wszystkich nawyków użytkownika (z filtrowaniem i paginacją)
const getHabits = async (req, res) => {
  let { page = 1, limit = 10, sort = 'createdAt', order = 'desc', name } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || page < 1) return res.status(400).json({ message: 'Nieprawidłowy numer strony' });
  if (isNaN(limit) || limit < 1 || limit > 100) return res.status(400).json({ message: 'Nieprawidłowy limit' });

  if (!ALLOWED_SORT_FIELDS.includes(sort)) {
    return res.status(400).json({ message: `Nieprawidłowe pole sortowania. Dozwolone: ${ALLOWED_SORT_FIELDS.join(', ')}` });
  }

  try {
    const filter = { owner: req.user.id };
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    const habits = await Habit.find(filter)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Habit.countDocuments(filter);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      habits,
    });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};


// Aktualizacja nawyku
const updateHabit = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Nieprawidłowy format ID' });
  }

  if (!name && !description) {
    return res.status(400).json({ message: 'Brak danych do aktualizacji' });
  }

  if (typeof name === 'string' && name.trim() === '') {
    return res.status(400).json({ message: 'Nieprawidłowa nazwa nawyku' });
  }

  if (typeof name === 'string' && name.length > 100) {
    return res.status(400).json({ message: 'Nazwa nawyku nie może mieć więcej niż 100 znaków' });
  }

  if (typeof description === 'string' && description.length > 500) {
    return res.status(400).json({ message: 'Opis nie może mieć więcej niż 500 znaków' });
  }

  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ message: 'Nawyk nie znaleziony' });
    }

    res.json({ message: 'Nawyk zaktualizowany', habit });
  } catch (error) {
    console.error('Błąd przy aktualizacji nawyku:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};


// Usunięcie nawyku
const deleteHabit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Nieprawidłowy format ID' });
  }

  try {
    const habit = await Habit.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({ message: 'Nawyk nie znaleziony' });
    }

    res.json({ message: 'Nawyk usunięty' });
  } catch (error) {
    console.error('Błąd przy usuwaniu nawyku:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};


module.exports = { createHabit, getHabits, updateHabit, deleteHabit };
