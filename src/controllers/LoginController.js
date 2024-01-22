// Para encriptar la información
const bcrypt = require('bcrypt');

function login(req, res) {
    res.render('login');
}

function auth(req, res){
    const data = req.body;
    
    // Comprobamos si existe el usuario
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE username = ?', [data.username], (err, userData) => {
            if(userData.length > 0){
                // Se compara la contraseña que inserta con la que hay almacenada
                userData.forEach(element => {
                    bcrypt.compare(data.password, element.password, (err, isMatch) =>{
                        if(!isMatch){
                            res.render('login', {error: 'Error: Contraseña incorrecta!'});
                        }
                        else{
                            // Creamos la sesión
                            req.session.loggedin = true;
                            req.session.name = element.username;

                            res.redirect('/');
                        }
                    });
                });
            }
            else{
                res.render('login', {error: 'Error: Este usuario no existe!'});
            }
        });
    });
}

function signUp(req, res) {
    res.render('signUp');
}

// Imprime info del formulario
function anyadirUser(req, res) {
    const data = req.body;

    // Comprobamos si existe el usuario
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userData) => {
            if(userData.length > 0){
                res.render('signUp', {error: 'Error: Este usuario ya existe.'});
            }
            else{
                // Encriptamos contraseña
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;
                    
                    // Añadimos usuario
                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
                            res.redirect('/');
                        })
                    });
                });
            }
        })
    })
    
}

module.exports = {
    login,
    signUp,
    anyadirUser,
    auth
}