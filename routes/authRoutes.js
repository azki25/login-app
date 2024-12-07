const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); // Pastikan path ke middleware benar

// Endpoint login
router.post('/login', authController.login);

// Endpoint register
router.post('/register', authController.register);

// Endpoint profil user, hanya bisa diakses jika user terautentikasi
router.get('/profile', authenticateToken, (req, res) => {
    // Akses user dari token JWT yang sudah diverifikasi di middleware
    res.json({ message: `Welcome, ${req.user.username}! This is your profile.` });
});

module.exports = router;






