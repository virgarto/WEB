function goToInforme (req, res){
    const email = req.query.email;
    res.render('informeEntrenador', {rol: req.session.rol, email});
}

function getInforme(req,res) {
    
}

module.exports = {
    goToInforme,
}