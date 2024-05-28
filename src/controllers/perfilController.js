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
        conn.query('SELECT * FROM users WHERE email = ?', [req.session.email] , (err, userData) => {
            
            if(userData.length > 0){
                // comprobamos contraseña
                if(data.password && data.password.length > 0){
                    bcrypt.hash(data.password, 12).then(hash => {
                        data.password = hash; 
                        
                        // Si se ha añadido un nuevo nombre se actualiza username y password
                        if(data.username && data.username.length > 0){
                            conn.query('UPDATE users SET username = ?, password = ? WHERE email = ?', [data.username, data.password,req.session.email]);
                            console.log(data.username);
                        }
                        else{
                            // Actualiza password
                            conn.query('UPDATE users SET password = ? WHERE email = ?', [data.password, req.session.email]);
                        }
                    });
                }else if(data.username && data.username.length > 0){
                    // Actualiza username
                        conn.query('UPDATE users SET username = ? WHERE email = ?', [data.username, req.session.email]);
                }

                // Actualizamos las variables de sesion
                req.session.name = data.username;
                req.session.password = data.password;
                res.redirect('/');

            }
            else{
                res.render('editUserForm', {error: 'Error: No has hecho ningún cambio.'});
            }
        })
    });
}


module.exports = {
    editUser,
    editPatinador,
}