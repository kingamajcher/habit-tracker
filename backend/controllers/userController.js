const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Hasło musi mieć co najmniej 6 znaków' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik już istnieje' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Użytkownik zarejestrowany' });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};


// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Brakuje danych logowania' });
  }

  try {
    // Szukaj użytkownika po emailu lub nazwie użytkownika
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier }
      ],
    });

    if (!user) {
      return res.status(400).json({ message: 'Nieprawidłowy email/nazwa użytkownika lub hasło' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Nieprawidłowy email/nazwa użytkownika lub hasło' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        algorithm: 'HS256',
      }
    );

    res.status(200).json({ token, message: 'Zalogowano pomyślnie' });
  } catch (error) {
    console.error('Błąd logowania:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};


// Pobieranie danych o użytkowniku
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Pobieranie wszystkich użytkowników
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Zwraca dane zalogowanego użytkownika
const getMe = (req, res) => {
  const { _id, username, email } = req.user;
  res.json({ id: _id, username, email });
};


module.exports = { registerUser, loginUser, getUserProfile, getAllUsers, getMe };
