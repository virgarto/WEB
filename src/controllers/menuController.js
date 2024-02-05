function home (req, res){
    res.render('home');
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

function entrenamientos (req, res){
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ 
        res.render('entrenamientos');
    }
}

module.exports = {
    home,
    perfil,
    entrenamientos
}