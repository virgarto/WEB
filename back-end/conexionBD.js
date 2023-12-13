const mysql = require('mysql');

// Creamos la conexión a la BBDD
const conexión = mysql.createConnection({
    host: 'Virginia',
    user: 'root',
    password: 'mysqltfg',
    database: 'tfg',
    port: '3306'
});

conexión.connect((error) => {
    if (error){
        throw error; 
    }
    console.log('Conexión a la base de datos exitosa!');
});