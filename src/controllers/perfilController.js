const bcrypt = require('bcrypt');

function editUser (req, res){
    if(req.session.rol != 'Entrenador'){
        res.render('editUserForm');
    }
        
    else    
        res.render('editEntrenadorForm');
}

function editPatinador (req, res){
    const data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM users WHERE email = ?', [req.session.email] , (err, userData) => {
            
            if(userData.length > 0){
                if(req.body.password){
                    bcrypt.hash(data.password, 12).then(hash => {
                        data.password = hash; 

                        conn.query('UPDATE users SET username = ?, password = ?, estado = ? WHERE email = ?', [data.username, data.password, data.estado, req.session.email]);
                        req.session.name = data.username;
                        req.session.estado = data.estado;
                        res.redirect('/');
                    });
                }
            }
            else{
                res.render('editUserForm', {error: 'Error: No has hecho ningún cambio.'});
            }
            
        })
    });
}

function verReglamento (req, res){
    //Tendría que descargar el archivo 
}

module.exports = {
    editUser,
    editPatinador,
}