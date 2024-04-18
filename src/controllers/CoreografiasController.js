function goToDiscoCortoForm (req, res){
    res.render('discoCortoForm', {rol: req.session.rol, categoria: req.session.categoria});
}

module.exports ={
    goToDiscoCortoForm,
}