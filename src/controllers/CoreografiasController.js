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
    const selectedSalto = req.body.salto;
    const code = req.body.code;
    console.log("Salto: " + selectedSalto);
    console.log(code);
/*
    req.getConnection((error, conn) =>{
        conn.query('SELECT rating_base AS value FROM saltos_base WHERE salto_nombre = ?', [selectedSalto], (error, base) =>{
            console.log("Valoración: " + base[0].value);
            let base_salto = base[0].value;

            // Cargamos el formulario base y pasamos los valores 
            res.render('discoCortoForm', {salto: selectedSalto, base_salto});
        })
    })*/
    
}

module.exports ={
    goToDiscoCortoForm,
    goToaddElementInForm,
    addElement,
}