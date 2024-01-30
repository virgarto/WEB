const bcrypt = require('bcrypt');

function editUser (req, res){
    if(req.session.rol != 'Entrenador'){
        console.log('Edit: ' + req.session.fecha_nacimiento);
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

                        conn.query('UPDATE users SET username = ?, password = ?, fecha_nacimiento = ?, estado = ? WHERE email = ?', [data.username, data.password, data.fecha_nacimiento, data.estado, req.session.email]);
                        req.session.name = data.username;
                        req.session.fecha_nacimiento = data.fecha_nacimiento;
                        req.session.estado = data.estado;
                        res.redirect('/');
                    });
                }
            }
            else{
                console.log('estoy aqui');
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