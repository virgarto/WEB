function goToDiscoCortoForm (req, res){
    res.render('discoCortoForm', {rol: req.session.rol});
}

module.exports ={
    goToDiscoCortoForm,
}