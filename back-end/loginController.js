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

/*
<!DOCTYPE html>
<html>
<head>
 <title>Login</title>
</head>
<body>
 <h1>Login</h1>
 <form id="loginForm">
 <label for="username">Usuario:</label>
 <input type="text" id="username" name="username" required><br>
 <label for="password">Contraseña:</label>
 <input type="password" id="password" name="password" required><br>
 <button type="submit">Iniciar sesión</button>
 </form>
 <p id="message"></p>

 <script>
 document.getElementById('loginForm').addEventListener('submit', function(event) {
   event.preventDefault();

   var xhr = new XMLHttpRequest();
   xhr.open('POST', '/login', true);
   xhr.setRequestHeader('Content-Type', 'application/json');

   xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        document.getElementById('message').textContent = 'Login exitoso';
      } else {
        document.getElementById('message').textContent = 'Usuario o contraseña incorrectos';
      }
    } else {
      document.getElementById('message').textContent = 'Error: ' + xhr.status;
    }
   };

   var data = {
     username: document.getElementById('username').value,
     password: document.getElementById('password').value
   };

   xhr.send(JSON.stringify(data));
 });
 </script>
</body>
</html>
*/