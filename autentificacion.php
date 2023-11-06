<?php
    session_start()

    // Credenciales de acceso a la base de datos
    $DATABASE_HOST = 'localhost';
    $DATABASE_USER = 'root';
    $DATABASE_PASS = '';
    $DATABASE_NAME = 'skating tracker bbdd';

    //CONEXION A LA BASE DE DATOS
    $conexion = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);

    if(mysqli_connect_error()){
        // Si hay un error al crear la conexión
        exit('Fallo en la conexión de MySQL: ', mysqli_connect_error());
    }

    // Se valida si se ha enviado información mediante la función isset
    if(!isset($_POST['username'], $_POST['password'])){
        header('Location: login.html');
    }
    if($smtmt = $conexion->prepare('SELECT id, password FROM users WHERE username = ?')){
        // parametros de enlace 
        $stmt->bind_param('s', $_POST['username']);
        $stmt->execute();
    }

    //Se valida si los ingresado coincide con lo almacenado en la BBDD
    $stmt->store_result();
    if($stmt->num_rows > 0){
        $stmt->bind_result($id, $password);
        $stmt->fetch();

        
    }