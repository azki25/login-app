const bcrypt = require('bcryptjs');
const password = 'test123'; // password yang ingin Anda hash

bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        console.log(hash); // Ini akan mencetak hash password yang benar
    });
});
