const bcrypt = require('bcrypt');
const e = require('express');

/***************************************************************/
/* Función que carga el formulario para editar la información  */
/* del usuario                                                 */
/***************************************************************/
function editUser (req, res){
    res.render('editUserForm', { name: req.session.name,
                                password: req.session.password});
    
}

/***************************************************************/
/* Función para editar la información del usuario que se       */
/* encuentra loggeado                                          */
/***************************************************************/
function editPatinador (req, res){
    const data = req.body;

    req.getConnection((err, conn) =>{
        // obtenemos la información mediante el email, ya que no se puede cambiar
        conn.query('SELECT * FROM users WHERE email = ?', [req.session.email] , (err, userData) => {
            
            if(userData.length > 0){
                // Comprobamos si se añadido una nueva contraseña
                if(data.password && data.password.length > 0){
                    bcrypt.hash(data.password, 12).then(hash => {
                        data.password = hash; 

                        // Comprobamos si han cambiado el username
                        if(data.username && data.username.length > 0){
                            conn.query('UPDATE users SET username = ?, password = ? WHERE email = ?', [data.username, data.password,req.session.email]);
                            console.log(data.username);
                        }
                        else{
                            conn.query('UPDATE users SET password = ? WHERE email = ?', [data.password, req.session.email]);
                        }
                    });
                }else if(data.username && data.username.length > 0){
                        conn.query('UPDATE users SET username = ? WHERE email = ?', [data.username, req.session.email]);
                }

                // Actualizamos la información de la session
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