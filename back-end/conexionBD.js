const mysql = require('mysql2');

// Creamos la conexión a la BBDD
const conexión = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqltfg',
    database: 'tfg',
    port: '3306'
});

conexión.connect((error) => {
    if (error){
        throw error; 
    }
    console.log('Conexión a la base de datos cumplida con éxito!');
});