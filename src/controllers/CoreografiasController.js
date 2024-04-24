function goToDiscoCortoForm (req, res){
    res.render('discoCortoForm', {rol: req.session.rol, categoria: req.session.categoria, name:  req.session.name}); 
}

function goToaddElementInForm (req, res){
    const fila = req.query.fila;
    const codigo = req.query.codigo;
    const name = req.query.name;
    const categoria = req.query.categoria;

    res.render('addElements', {rol: req.session.rol, fila, codigo, name, categoria});
}

function addElement(req, res){
    const fila = req.body.fila;
    const selectedSalto = req.body.salto;
    const code = req.body.code;
    const name = req.body.patinador;
    const categoria = req.body.categoria;
    
    console.log("Code: " + code);
    console.log("#" + fila);
    console.log("Salto: " + selectedSalto);
    

    // Formulario para el SJu
    if(code == 'SJu'){
        req.getConnection((error, conn) =>{
            conn.query('SELECT rating_base AS value FROM saltos_base WHERE salto_nombre = ?', [selectedSalto], (error, base) => {
                console.log("Valoración: " + base[0].value);
                let base_pos = `base${fila}`;
                let elemento_pos = `elemento${fila}`;

                // Cargamos el formulario base y pasamos los valores 
                res.render('discoCortoForm', {[elemento_pos]: selectedSalto, [base_pos]: base[0].value, name, categoria});
            })
        })
    }
    

    if(code == 'CoJ'){
        req.getConnection((error, conn) =>{
            let base_pos =  `base${fila}`;
            let elemento_pos = `elemento${fila}`;
            let total_base = 0;
            let base_salto = []

            for(i = 0; i < selectedSalto.length; i++){
                var salto = selectedSalto[i];
                conn.query('SELECT rating_base AS value FROM saltos_base WHERE salto_nombre = ?', [salto], (error, base) => {
                
                    base_salto.push(base[0].value);
                    total_base += base[0].value;
                    console.log("BASE: " + total_base)

                    if(base_salto.length == selectedSalto.length){
                        res.render('discoCortoForm', {code, [elemento_pos]: selectedSalto, [base_pos]: total_base});
                    }
                }) 
            }
        })
    }
    
}

module.exports ={
    goToDiscoCortoForm,
    goToaddElementInForm,
    addElement,
}