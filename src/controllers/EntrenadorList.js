function listPatinadores (req, res){
    console.log('hola :)');
    req.getConnection((err, conn) => {
        if(err) 
            console.log('Error al conectarse a la BBDD: ' + err);
        else{
            conn.query('SELECT username, fecha_nacimiento, categoria_act, categoria_post FROM users WHERE rol = "Patinador/a" AND club = ?', [club], (err, listPat) => {
                console.log(listPat);
                res.render('entrenamientosList', {listaPatinadores: listPat, msg: 'Hola'});
            });
           
            
        }
    })
}

module.exports = {
    listPatinadores,
}