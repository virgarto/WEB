function goToDiscoCortoForm (req, res){
    const categoria = req.session.categoria
    if(categoria == 'Alevín' || categoria == 'Benjamin'){
        res.render('coreografías', {rol: req.session.rol, msg: 'Programa no disponible para la categoría Alevín y Benjamin'});
    }
    res.render('discoCortoForm', {rol: req.session.rol, categoria: req.session.categoria, name:  req.session.name}); 
}

function goToaddElementInForm (req, res){
    const fila = req.query.fila;
    const codigo = req.query.codigo;
    const name = req.query.name;
    const categoria = req.query.categoria;

    if(rowsCortoLibre.length == 7){
        return res.render('discoCortoForm', {rowsCortoLibre, sumaBASE, name, categoria, msg: 'Ya no se pueden añadir más elementos al programa.'})
    }

    res.render('addElements', {rol: req.session.rol, fila, codigo, name, categoria});
}

let rowsCortoLibre = [];
let rowsLargoLibre = [];
let sumaBASE = 0;



function addElement(req, res){
    const fila = req.body.fila;
    const codigo = req.body.code;
    const name = req.body.patinador;
    const categoria = req.body.categoria;
    let numRows = 0;
    
    
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

                                
                if (numRows < 7) {
                    rowsCortoLibre.push({
                        code: `SJu`,
                        elemento: selectedSalto,
                        base: base[0].value
                    });
                    numRows++;
                }

                console.log(rowsCortoLibre);

                sumaBASE += base[0].value;
                console.log('suma de BASE: '+ sumaBASE);

                // Cargamos el formulario base y pasamos los valores 
                res.render('discoCortoForm', {rowsCortoLibre, sumaBASE, name, categoria});
            })
        })
    }
    
    // Formulario para Combinado de Saltos
    if(codigo == 'CoJ'){
        const selectedSalto = req.body.salto;
        req.getConnection((error, conn) =>{
            // Tenemos en cuenta la incrementación de valor de saltos según el reglamento
            let base_final;
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
                    //total_base += base[0].value;
                    console.log("BASE: " + total_base)
                    base_final = base[0].value;

                    // Comprobamos la categoría y luego los dobles y triples consecutivos
                    if(i > 0){
                        let previousSalto = selectedSalto[i-1];

                        //LO COMENTADO ES PARA ALEVIN, INFANTIL Y CADETE DEL PROGRAMA LARGO
                        /* if(categoria == 'Alevín' || categoria == 'Infantil'){
                            if (salto.endsWith('_2') && previousSalto.endsWith('_2')){
                                // Incrementamos el valor un 10%
                                base_final *= 1.1;  
                                total_base += base_final;
                            }
                        }*/

                        if ((salto.endsWith('_2') && previousSalto.endsWith('_3')) || (salto.endsWith('_3') && previousSalto.endsWith('_2'))){
                            // Incrementamos el valor un 20%
                            base_final *= 1.2; 
                            total_base += base_final; 

                            if(salto == 'axel_2' && previousSalto == 'axel_2'){
                                // Los doble Axel se consideran triples en este caso
                                base_final *= 1.3;
                                total_base += base_final;
                            }
                        }

                        if (salto.endsWith('_3') && previousSalto.endsWith('_3')){
                            // Incrementamos el valor un 30%
                            base_final *= 1.3;  
                            total_base += base_final;
                        }
                    }
                    else{
                        total_base += base[0].value;
                    }
                    

                    // Comprobamos que estén todos y pasamos la información a la tabla de la coreografía
                    if(base_salto.length == selectedSalto.length){
                        if (numRows < 7) {
                            rowsCortoLibre.push({
                                code: `CoJ`,
                                elemento: selectedSalto,
                                base: total_base
                            });
                            numRows++;
                        }
        
                        console.log(rowsCortoLibre);
        
                        sumaBASE += total_base;
                        console.log('suma de BASE: '+ sumaBASE);
        
                        // Cargamos el formulario base y pasamos los valores 
                        res.render('discoCortoForm', {rowsCortoLibre, sumaBASE, name, categoria});
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
                if (numRows < 7) {
                    rowsCortoLibre.push({
                        code: `FoSq`,
                        elemento: fosq_level,
                        base: base[0].value
                    });
                    numRows++;
                }

                console.log(rowsCortoLibre);

                sumaBASE += base[0].value;
                console.log('suma de BASE: '+ sumaBASE);

                // Cargamos el formulario base y pasamos los valores 
                res.render('discoCortoForm', {rowsCortoLibre, sumaBASE, name, categoria});
            })
        })
    }

    if(codigo == 'SSp'){
        const selectedSpin = req.body.spin;
        console.log(selectedSpin);
        
        req.getConnection((err,conn)=>{
            conn.query('SELECT rating_base as value FROM spin_base WHERE spin = ?', [selectedSpin], (error, base) => {
                if (numRows < 7) {
                    rowsCortoLibre.push({
                        code: `SSp`,
                        elemento: selectedSpin,
                        base: base[0].value
                    });
                    numRows++;
                }

                console.log(rowsCortoLibre);

                sumaBASE += base[0].value;
                console.log('suma de BASE: '+ sumaBASE);

                // Cargamos el formulario base y pasamos los valores 
                res.render('discoCortoForm', {rowsCortoLibre, sumaBASE, name, categoria});
            })
            
        })
    }

    if(codigo == 'CSp'){
        const selectedSpin = req.body.spin;
        req.getConnection((error, conn) =>{
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
                        if (numRows < 7) {
                            rowsCortoLibre.push({
                                code: `CSp`,
                                elemento: selectedSpin,
                                base: total_base
                            });
                            numRows++;
                        }
        
                        console.log(rowsCortoLibre);
        
                        sumaBASE += total_base;
                        console.log('suma de BASE: '+ sumaBASE);
        
                        // Cargamos el formulario base y pasamos los valores 
                        res.render('discoCortoForm', {rowsCortoLibre, sumaBASE, name, categoria});
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