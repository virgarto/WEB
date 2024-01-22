// Para encriptar la información
const bcrypt = require('bcrypt');

function login(req, res) {
    res.render('login');
}

function signUp(req, res) {
    res.render('signUp');
}

// Imprime info del formulario
function storeUser(req, res) {
    const data = req.body;
    bcrypt.hash(data.password, 12).then(hash => {
        data.password = hash;
        
        req.getConnection((err, conn) => {
            conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
                res.redirect('/');
            });
        });
    });
    
}

module.exports = {
    login,
    signUp,
    storeUser,
}