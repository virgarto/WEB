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
        res.render('entrenamientosList', {rol: req.session.rol});
           
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