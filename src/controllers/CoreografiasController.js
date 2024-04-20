function goToDiscoCortoForm (req, res){
    res.render('discoCortoForm', {rol: req.session.rol, categoria: req.session.categoria, name:  req.session.name}); 
}

function addElementInForm (req, res){
    res.render('addElements', {rol: req.session.rol});
}

module.exports ={
    goToDiscoCortoForm,
    addElementInForm,
}