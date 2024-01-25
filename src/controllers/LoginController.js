// Para encriptar la información
const bcrypt = require('bcrypt');

function login(req, res) {
    // Comprobamos que no haya una sesion: Si no la hay al pulsar login le manda al form
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ //Si hay sesión creada le manda al perfil
        res.render('perfil');
    }
}

//Función inicio sesión
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
                            req.session.rol = element.rol;

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
    // Comprobamos que no haya una sesion: Si no la hay al pulsar login le manda al form
    if(req.session.loggedin != true)
    {
        res.render('signUp');
    }
    else{ //Si hay sesión creada le manda al perfil
        res.render('perfil');
    }
}

//Funcion registrar usuario
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
                            req.session.loggedin = true;
                            req.session.name = data.username;
                            res.redirect('/');
                        })
                    });
                });
            }
        })
    })
    
}

//Función cierre sesión
function logout(req, res) {
    if(req.session.loggedin == true){
        req.session.destroy();

    }
    
    res.redirect('/login');
}

module.exports = {
    login,
    signUp,
    anyadirUser,
    auth,
    logout
}