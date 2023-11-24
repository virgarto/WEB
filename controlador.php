<?php
    if(!empty($_POST("loginBtn"))){
        //Verificamos si existe la información introducida en el login
        if(empty($_POST("username") and empty($_POST("password")))){
            echo "Los campos están vacíos!"
        }
    }
?>