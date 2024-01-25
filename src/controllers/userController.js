function editUser (req, res){
    if(req.session.rol != 'Entrenador')
        res.render('editUserForm');
    else    
        res.render('editEntrenadorForm');
}

function verReglamento (req, res){
    //Tendría que descargar el archivo 
}

module.exports = {
    editUser,
}