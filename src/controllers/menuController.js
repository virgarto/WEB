function home (req, res){
    res.render('home', {rol: req.session.rol});
}

function perfil (req, res){
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ //Si hay sesión creada le manda al perfil
        res.redirect('/');
    }
}

function entrenamientosPatinador (req, res){
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ 
        res.render('entrenamientos');     
    }
}

function entrenamientosEntrenador (req, res){
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ 
        req.getConnection((err, conn) => {
            if(err) 
                console.log('Error al conectarse a la BBDD: ' + err);
            else{
                let listaPatinadores = {}
                // Obtenemos mediante una query el listado de patinadores en su mismo club
                conn.query('SELECT username, fecha_nacimiento, categoria_act, categoria_post FROM users WHERE rol = "Patinador/a" AND club = ?', [req.session.club], (err, listPat) => {
                    for(let i = 0; i < listPat.lenght; i++){
                        listaPatinadores = listPat[i];

                        if (listaPatinadores.length === listPat.length) {
                            // Renderizamos la vista con los datos
                            res.render('entrenamientosList', {listaPatinadores, rol: req.session.rol});
                        }
                    }
                });
            }  
        })   
    }   
}

function coreografias (req, res){
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ 
        res.render('coreografias', {rol: req.session.rol});
    }
}

module.exports = {
    home,
    perfil,
    entrenamientosPatinador,
    entrenamientosEntrenador,
    coreografias
}