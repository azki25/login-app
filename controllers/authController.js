const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Daftar pengguna contoh untuk simulasi login dan register
let users = [
    {
        username: 'testuser',
        password: '$2a$10$Fyba.I4GxZMe3fp/4/.ptuwyTPqD9zACGlS70MEYgE5iBY7H/Gupm', // Hash password
    },
];

// Fungsi login
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Cari user berdasarkan username
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Bandingkan password yang di-hash
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ message: 'Server error during password comparison' });
        }

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Buat token JWT jika login berhasil
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};


// Fungsi register
exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password dan simpan pengguna baru
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({ message: 'Server error during password generation' });
        }

        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Server error during password hashing' });
            }

            const newUser = {
                username,
                password: hashedPassword,
            };

            users.push(newUser);
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};
