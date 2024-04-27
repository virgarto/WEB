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
    const codigo = req.body.code;
    const name = req.body.patinador;
    const categoria = req.body.categoria;
    
    console.log("Code: " + codigo);
    console.log("#" + fila);
    
    // Formulario para el Salto Simple
    if(codigo == 'SJu'){
        const selectedSalto = req.body.salto;
        //Conexión con la BBDD
        req.getConnection((error, conn) =>{
            // Obtenemos BASE del salto seleccionado
            conn.query('SELECT rating_base AS value FROM saltos_base WHERE salto_nombre = ?', [selectedSalto], (error, base) => {
                console.log("Valoración: " + base[0].value);
                let base_pos = `base${fila}`;
                let elemento_pos = `elemento${fila}`;
                let code = `code${fila}`;
                console.log(code);

                // Cargamos el formulario base y pasamos los valores 
                res.render('discoCortoForm', {[code]: 'SJu', [elemento_pos]: selectedSalto, [base_pos]: base[0].value, name, categoria});
            })
        })
    }
    
    // Formulario para Combinado de Saltos
    if(codigo == 'CoJ'){
        const selectedSalto = req.body.salto;
        req.getConnection((error, conn) =>{
            // Variables para form
            let base_pos =  `base${fila}`;
            let elemento_pos = `elemento${fila}`;
            let code = `code${fila}`;
            // Variables que guardan la puntuación total de los saltos y el array con todos los BASE
            let total_base = 0;
            let base_salto = []

            // Recorremos el array con los saltos seleccionados
            for(i = 0; i < selectedSalto.length; i++){
                var salto = selectedSalto[i];

                // Obtenemos BASE para cada salto
                conn.query('SELECT rating_base AS value FROM saltos_base WHERE salto_nombre = ?', [salto], (error, base) => {
                    // Guardamos el valor en el array y lo sumamos al total
                    base_salto.push(base[0].value);
                    total_base += base[0].value;
                    console.log("BASE: " + total_base)

                    // Comprobamos que estén todos y pasamos la información a la tabla de la coreografía
                    if(base_salto.length == selectedSalto.length){
                        res.render('discoCortoForm', {[code]: 'CoJ', [elemento_pos]: selectedSalto, [base_pos]: total_base, name, categoria});
                    }
                }) 
            }
        })
    }

    // Formulario para el Footwork Sequence
    if(codigo == 'FoSq'){
        const fosq_level = req.body.fosq;
        
        req.getConnection((err,conn)=>{
            conn.query('SELECT rating_base as value FROM fosq_base WHERE nivel = ?', [fosq_level], (error, base) => {
                let base_pos = `base${fila}`;
                let elemento_pos = `elemento${fila}`;
                let code = `code${fila}`;

                res.render('discoCortoForm', {[code]: 'FoSq', [elemento_pos]: fosq_level, [base_pos]: base[0].value, name, categoria});
            })
        })
    }

    if(codigo == 'SSp'){
        const selectedSpin = req.body.spin;
        
        req.getConnection((err,conn)=>{
            conn.query('SELECT rating_base as value FROM spin_base WHERE spin = ?', [selectedSpin], (error, base) => {
                let base_pos = `base${fila}`;
                let elemento_pos = `elemento${fila}`;
                let code = `code${fila}`;

                res.render('discoCortoForm', {[code]: 'SSp', [elemento_pos]: selectedSpin, [base_pos]: base[0].value, name, categoria});
            })
        })
    }

    if(codigo == 'CSp'){
        const selectedSpin = req.body.spin;
        req.getConnection((error, conn) =>{
            // Variables para form
            let base_pos =  `base${fila}`;
            let elemento_pos = `elemento${fila}`;
            let code = `code${fila}`;
            // Variables que guardan la puntuación total de los saltos y el array con todos los BASE
            let total_base = 0;
            let base_salto = []

            // Recorremos el array con los saltos seleccionados
            for(i = 0; i < selectedSpin.length; i++){
                var spin = selectedSpin[i];

                // Obtenemos BASE para cada salto
                conn.query('SELECT rating_base AS value FROM spin_base WHERE spin = ?', [spin], (error, base) => {
                    // Guardamos el valor en el array y lo sumamos al total
                    base_salto.push(base[0].value);
                    total_base += base[0].value;
                    console.log("BASE: " + total_base)

                    // Comprobamos que estén todos y pasamos la información a la tabla de la coreografía
                    if(base_salto.length == selectedSpin.length){
                        res.render('discoCortoForm', {[code]: 'CSp', [elemento_pos]: selectedSpin, [base_pos]: total_base, name, categoria});
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