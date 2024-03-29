function listPatinadores (req, res){
    
    req.getConnection((err, conn) => {
        if(err) 
            console.log('Error al conectarse a la BBDD: ' + err);
        else{
            conn.query('SELECT id FROM users WHERE ', [club], (err, listPat) => {
                console.log(listPat);
                res.render('entrenamientosList', {listaPatinadores: listPat, msg: 'Hola'});
            });
           
            
        }
    })
}

module.exports = {
    listPatinadores,
}