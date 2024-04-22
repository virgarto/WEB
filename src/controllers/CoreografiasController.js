function goToDiscoCortoForm (req, res){
    res.render('discoCortoForm', {rol: req.session.rol, categoria: req.session.categoria, name:  req.session.name}); 
}

function goToaddElementInForm (req, res){
    const fila = req.query.fila;
    const codigo = req.query.codigo;
    res.render('addElements', {rol: req.session.rol, fila, codigo});
}

function addElement(req, res){
    // Formulario para el SJu
    // Nos aseguramos de si está en mitad programa en adelante por aumentar el porcentaje de BASE
    
}

module.exports ={
    goToDiscoCortoForm,
    goToaddElementInForm,
    addElement,
}