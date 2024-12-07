require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Pastikan path ini benar
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Gunakan body-parser untuk membaca JSON dari request body
app.use(bodyParser.json());

// Daftarkan route untuk autentikasi
app.use('/api/auth', authRoutes);

// Tambahkan route untuk root ("/")
app.get('/', (req, res) => {
    res.send('Welcome to the JWT Authentication API');
});

// Tambahkan middleware untuk handle 404 - route tidak ditemukan
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Jalankan server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});





