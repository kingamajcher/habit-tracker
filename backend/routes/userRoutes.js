const express = require('express');
const { registerUser, loginUser, getUserProfile, getAllUsers, getMe } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

// Rejestracja użytkownika
router.post('/register', registerUser);

// Logowanie użytkownika
router.post('/login', loginUser);

// Pobieranie danych o użytkowniku
router.get('/profile', authMiddleware, getUserProfile);

// Pobieranie wszystkich użytkowników (tylko dla admina)
router.get('/', authMiddleware, isAdmin, getAllUsers);

// Zwraca dane zalogowanego użytkownika
router.get("/me", authMiddleware, getMe);

module.exports = router;
