const bcrypt = require('bcrypt');

function editUser (req, res){
    if(req.session.rol != 'Entrenador')
        res.render('editUserForm');
    else    
        res.render('editEntrenadorForm');
}

function editPatinador (req, res){
    console.log('hola :/');
    const data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM users WHERE email = ?', [req.session.email] , (err, userData) => {
            console.log('primera consulta:/');
            if(userData.length > 0){
                console.log('pilla que ha metido info :/');
                if(req.body.password){
                    bcrypt.hash(data.password, 12).then(hash => {
                        data.password = hash; 

                        console.log(data);
                        conn.query('UPDATE users SET username = ?, password = ?, fecha_nacimiento = ?, estado = ? WHERE email = ?', [data.username, data.password, data.fecha_nacimiento, data.estado, req.session.email]);
                        req.session.name = data.username;
                        res.redirect('/');
                    });
                }
            }
            else{
                console.log('casi colega :/');
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