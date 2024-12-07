const jwt = require('jsonwebtoken');

// Middleware untuk memeriksa apakah user sudah terautentikasi
const authenticateToken = (req, res, next) => {
    // Ambil token dari header 'Authorization'
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verifikasi token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next(); // Lanjutkan ke endpoint berikutnya
    });
};

module.exports = authenticateToken;
