const bcrypt = require('bcrypt');
const e = require('express');


/********************************************/
/* Función para acceder al formulario de    */
/* editar la información del usuario        */
/********************************************/
function editUser (req, res){
    res.render('editUserForm', { name: req.session.name,
                                password: req.session.password,
                                rol: req.session.rol});
    
}


/*********************************************/
/* Función para actualizar la información    */
/* del usuario                               */
/*********************************************/
function editPatinador (req, res){
    const data = req.body;

    req.getConnection((err, conn) =>{
        // obtenemos la información mediante el email, ya que no se puede cambiar
        conn.query('SELECT * FROM users WHERE email = ?', [req.session.email] , (err, userData) => {
            
            if(userData.length > 0){
                // Comprobamos que las dos contraseñas se han introducido
                if(data.password.length > 0 && data.password2.length > 0){

                    if(data.password === data.password2){
                        bcrypt.hash(data.password, 12).then(hash => {
                            data.password2 = hash; 
                            // Actualiza password
                            conn.query('UPDATE users SET password = ? WHERE email = ?', [data.password, req.session.email]);

                            if(data.username && data.username.length > 0 && data.username != userData[0].username){
                                conn.query('UPDATE users SET username = ?, password = ? WHERE email = ?', [data.username, data.password2, req.session.email]);
                                req.session.name = data.username;
                            }
                        });

                        // Actualizamos las variables de sesion
                        req.session.password = data.password2;
                        res.render('editUserForm', {msg: 'Cambios realizados con éxito!', name: req.session.name, password: req.session.password2});
                    }
                    else{
                        res.render('editUserForm', {error: 'Error:Las contraseñas no coinciden.'});
                    }
                }
                else if(data.username && data.username.length > 0){
                    // Actualiza username
                    conn.query('UPDATE users SET username = ? WHERE email = ?', [data.username, req.session.email]);
                    req.session.name = data.username;
                    res.render('editUserForm', {msg: 'Cambios realizados con éxito!', name: req.session.name});
                }
            }
            if(data.username == userData[0].username && data.password2 == ''){
                res.render('editUserForm', {error: 'Error: No has hecho ningún cambio.'});
            }
        })
    });
}


module.exports = {
    editUser,
    editPatinador,
}