// Hacemos la conexión a la BBDD
const conexión = require('./conexionBD');

//Función del login
function loginUsuario(user, password) {
    conexión.query('SELECT * FROM usuarios WHERE user = ? AND password = ?', [user, password], (error, results, fields)=>{
        if(error){
            console.error('Error al hacer la consulta: ', error);
            return;
        }

        if(results.length === 0){
            console.log('Usuario no encontrado');
        }
        else{
            console.log('Usuario encontrado: ', results[0]);
        }
    });
}

module.exports = loginUsuario;