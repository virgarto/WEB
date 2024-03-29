function goToInforme (req, res){
   res.render('informeEntrenador', {rol: req.session.rol});
   
}

module.exports = {
    goToInforme,
}