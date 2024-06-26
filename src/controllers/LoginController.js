// Para encriptar la información
const bcrypt = require('bcrypt');

/*******************************************************/
/* Función que carga el formulario de login o en caso  */
/*  de haber una sesión iniciada lleva al perfil       */
/*******************************************************/
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

/********************************************************/
/* Función que se encarga del inicio de sesión del user */
/********************************************************/
function auth(req, res){
    const data = req.body;
    
    // Comprobamos si existe el usuario
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE username = ?', [data.username], (err, userData) => {
            if(userData.length > 0){
                // Se compara la contraseña que inserta con la que hay almacenada
                userData.forEach(element => {
                    /*bcrypt.compare(data.password, element.password, (err, isMatch) =>{
                        if(!isMatch){
                            res.render('login', {error: 'Error: Contraseña incorrecta!'});
                        }*/
                       // else{
                            // Creamos la sesión
                            req.session.loggedin = true;
                            req.session.email = element.email;
                            req.session.name = element.username;
                            req.session.categoria = element.categoria_act;
                            req.session.club = element.club;

                            //Pasamos el rol a la sesión tan solo si el usuario cuenta con el rol de Entrenador
                            if(element.rol == 'Entrenador'){
                                req.session.rol = element.rol;
                            }

                            res.redirect('/');
                      //  }
                  //  });
                });
            }
            else{
                // Si no se encuentra el usuario
                res.render('login', {error: 'Error: Este usuario no existe!'});
            }
        });
    });
}

/**********************************************************/
/* Función que carga el formulario de registro o en caso  */
/*  de haber una sesión iniciada lleva al perfil          */
/**********************************************************/
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

/******************************************************/
/* Función para añadir un nuevo usuario a la BBDD y   */
/* crea su sesión                                     */
/******************************************************/
function anyadirUser(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        // Comprobamos si existe el usuario
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
                            req.session.fecha_nacimiento = data.fecha_nacimiento;
                            req.session.club = data.club;

                            //Pasamos el rol a la sesión tan solo si el usuario cuenta con el rol de Entrenador
                            if(data.rol == 'Entrenador'){
                                req.session.rol = data.rol;
                            }

                            // Obtenemos el año de nacimiento del usuario
                            const fechaNacimiento = new Date(data.fecha_nacimiento);
                            const anyoNacimiento = fechaNacimiento.getFullYear();
                            
                            // Ponemos categoria segun edad
                            if(anyoNacimiento > 2003 && data.rol ==  "Patinador/a"){
                                conn.query('SELECT cat_2023, cat_2024, cat_2025 FROM categoria WHERE anyo = ?', [anyoNacimiento], (err, catData) =>{
                                
                                    conn.query('UPDATE users SET categoria_ant = ?, categoria_act = ?, categoria_post = ? WHERE email = ?', 
                                        [catData[0].cat_2023, catData[0].cat_2024, catData[0].cat_2025, data.email]);
                                
                                    data.categoria = catData[0].cat_2024;
                                    req.session.categoria = data.categoria;
                                    res.redirect('/');
                                })
                            }
                            else{
                                res.redirect('/');
                            }
                        })
                    });
                });
            }
        })
    })
    
}

/****************************************/
/* Función para el cierre de sesión     */
/****************************************/
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