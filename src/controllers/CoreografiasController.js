/*****************************************************/
/* Función para acceder al formulario para crear una */
/* coreografía de Modalidad Libre Disco LIBRE        */
/*****************************************************/
function goToDiscoLibreForm (req, res){
    const categoria = req.session.categoria;
    const typeDisc = req.query.typeDisc;

    // Reiniciamos el array con la información de la Coreografía así como la BASE
    resetRowsLibre();

    // PROGRAMA CORTO NO DISPONIBLE PARA DOS CATEGORIAS
    if((categoria == 'Alevín' && typeDisc == 'Corto') || (categoria == 'Benjamin' && typeDisc == 'Corto')){
        res.render('coreografías', {rol: req.session.rol, msg: 'Programa no disponible para la categoría Alevín y Benjamin'});
    }

    res.render('discoLibreForm', {rol: req.session.rol, categoria: req.session.categoria, name:  req.session.name, typeDisc}); 
}

/*****************************************************/
/* Función para acceder al formulario para añadir a  */
/* la coreogría un nuevo elemento. También controla  */
/* que se pueda añadir más elementos a los disco     */
/*****************************************************/
function goToaddElementInForm (req, res){
    // Variables del form
    const codigo = req.query.codigo;
    const name = req.query.name;
    const categoria = req.query.categoria;
    const typeDisc = req.query.typeDisc;
    console.log('Disco ' + typeDisc)

    // Comprobamos que se puedan añadir o no más elementos al form dependiendo del tipo
    if(typeDisc == 'Corto'){
        if(rowsLibre.length == 7){
            return res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, msg: 'Ya no se pueden añadir más elementos al programa.'})
        }
    }
    else{
        if(rowsLibre.length == 13){
            return res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, msg: 'Ya no se pueden añadir más elementos al programa.'})
        }
    }
    
    res.render('addElements', {rol: req.session.rol, codigo, name, categoria, typeDisc});
}

/*****************************************************/
/* Variables que guardan los programas Corto y Largo */
/* y el numero de BASE  que tiene la coreografía     */
/*****************************************************/

let rowsLibre = [];
let sumaBASE = 0;
let numRows = 0;
let nCJu = 0;


/*****************************************************/
/* Función de reseteo del Array de rowsLibre y BASE  */
/*****************************************************/
function resetRowsLibre(){
    rowsLibre = [];
    sumaBASE = 0;
    numRows = 0;
    console.log("Array reseteado");
}

function checkAxel(selectedSalto){
    let hayAxel = false;

    for(const row of rowsLibre){
        if(row.code == 'SJu'){
            if(row.elemento == 'axel' || row.elemento == 'axel_2'){
                hayAxel = true;
                break;
            }
        }
    }

    return hayAxel;
}

function checkDuplicate(selectedSalto){
    let isDuplicate = false;

    for (const row of rowsLibre) {
        console.log('Row elemento: ' + row.elemento)
        console.log('Selected Saltos: ' + selectedSalto)

        // Comparamos cada elemento del array elemento con el introducido
        const isEqual = row.elemento.every(value => selectedSalto.includes(value));
        if (isEqual) {
            isDuplicate = true;
            break;
        }
    }

    return isDuplicate;
}

/*****************************************************/
/* Función que según el codigo del elemento, añade a */
/* la coreografía el salto o la pirueta junto con su */
/* BASE */
/*****************************************************/
function addElement(req, res){
    // Variables del form
    const codigo = req.body.code;
    const name = req.body.patinador;
    const categoria = req.body.categoria;
    
    const typeDisc = req.body.typeDisc;
    
    console.log(typeDisc);
    console.log("Code: " + codigo);
    
    // Formulario para el Salto Simple
    if(codigo == 'SJu'){
        const selectedSalto = req.body.salto;

        let hayAxel = checkAxel(selectedSalto);

        if(hayAxel){
            res.render('addElements', {rol: req.session.rol, codigo, name, categoria, typeDisc, msg: 'No se puede seleccionar un Axel de nuevo'});
        }
        else{
            req.getConnection((error, conn) =>{
                // Obtenemos BASE del salto seleccionado
                conn.query('SELECT rating_base AS value FROM saltos_base WHERE salto_nombre = ?', [selectedSalto], (error, base) => {
                    console.log("Valoración: " + base[0].value);

                    if(typeDisc == 'Corto'){
                        if (numRows < 7) {
                            console.log("numRows: " + numRows);
                            rowsLibre.push({
                                code: `SJu`,
                                elemento: selectedSalto,
                                base: base[0].value
                            });
                            numRows++;
                        }
                        else{
                            // CUANDO RECARGAS LAS PAGINA Y SE DUPLICA EL ULTIMO ELEMENTO INTRODUCIDO
                            res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                        }
                    }
                    else{
                        if (numRows < 13) {
                            // Si se es de estas categorias, un salto despues de la mitad del programa incrementa su valor 10%
                            if(categoria == 'Cadete' || categoria == 'Juvenil' || categoria == 'Junior' || categoria == 'Senior'){
                                console.log('Categoria dentro');
                                if(numRows >= 6){
                                    console.log('Fila dentro');
                                    let base_salto = base[0].value + (base[0].value * 0.10); 
                                    console.log('Nueva base: '+ base_salto);
                                    rowsLibre.push({
                                        code: `SJu`,
                                        elemento: selectedSalto,
                                        base: base_salto.toFixed(2)
                                    });
                                }else{
                                    rowsLibre.push({
                                        code: `SJu`,
                                        elemento: selectedSalto,
                                        base: base[0].value
                                    });
                                }
                            }
                            numRows++;
                        }
                        else{
                            res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                        }
                    }
                    
                    console.log(rowsLibre);

                    sumaBASE += base[0].value;
                    console.log('suma de BASE: '+ sumaBASE);

                    // Cargamos el formulario base y pasamos los valores 
                    res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc});
                })
            })
        }
        
    }
    
    // Formulario para COMBINADO de SALTOS
    if(codigo == 'CoJ'){
        const selectedSalto = req.body.salto;

        // Comprobamos que no haya un combinado igual
        let isDuplicate = checkDuplicate(selectedSalto);

        if (isDuplicate) {
            res.render('addElements', {rol: req.session.rol, codigo, name, categoria, typeDisc, msg: 'Este Combinado de Saltos ya ha sido introducido en el programa'})
        }
        else{
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
                        base_final = base[0].value;

                        // Comprobamos la categoría y luego los dobles y triples consecutivos
                        if(i > 0){
                            let previousSalto = selectedSalto[i-1];
                            if (typeDisc == 'Largo'){
                                if(categoria == 'Alevín' || categoria == 'Infantil' || categoria == 'Cadete')
                                {
                                    if (salto.endsWith('_2') && previousSalto.endsWith('_2')){
                                        // Incrementamos el valor un 10%
                                        base_final *= 1.1;  
                                        total_base += base_final;
                                    }
                                }

                                if ((salto.endsWith('_2') && previousSalto.endsWith('_3')) || (salto.endsWith('_3') && previousSalto.endsWith('_2'))){
                                    // Incrementamos el valor un 20%
                                    base_final *= 1.2; 
                                    total_base += base_final; 
        
                                    if(salto == 'axel_2' || previousSalto == 'axel_2'){
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
                                else{
                                    total_base += base[0].value;
                                }
                            }
                            
                        }
                        
                        

                        // Comprobamos que estén todos y pasamos la información a la tabla de la coreografía
                        if(base_salto.length == selectedSalto.length){
                            if(typeDisc == 'Corto'){
                                if (numRows < 7) {
                                    rowsLibre.push({
                                        code: `CoJ`,
                                        elemento: selectedSalto,
                                        base: total_base.toFixed(2)
                                    });
                                    numRows++;
                                }
                                else{
                                    res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                                }
                            }
                            else{
                                if (numRows < 13) {
                                    rowsLibre.push({
                                        code: `CoJ`,
                                        elemento: selectedSalto,
                                        base: total_base.toFixed(2)
                                    });
                                    numRows++;
                                }
                                else{
                                    res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                                }
                            }
                
                            console.log(rowsLibre);
            
                            sumaBASE += total_base;
                            console.log('suma de BASE: '+ sumaBASE);
            
                            // Cargamos el formulario base y pasamos los valores 
                            res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria , typeDisc});
                            
                        }
                    }) 
                }
            })
        }
    }

    // Formulario para el FOOTWORK SEQUENCE
    if(codigo == 'FoSq'){
        const fosq_level = req.body.fosq;
        
        req.getConnection((err,conn)=>{
            conn.query('SELECT rating_base as value FROM fosq_base WHERE nivel = ?', [fosq_level], (error, base) => {
                if(typeDisc == 'Corto'){
                    if (numRows < 7) {
                        rowsLibre.push({
                            code: `FoSq`,
                            elemento: fosq_level,
                            base: base[0].value
                        });
                        numRows++;
                    }
                    else{
                        res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                    }
                }
                else{
                    if (numRows < 13) {
                        rowsLibre.push({
                            code: `FoSq`,
                            elemento: fosq_level,
                            base: base[0].value
                        });
                        numRows++;
                    }
                    else{
                        res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                    }
                }
                
                console.log(rowsLibre);

                sumaBASE += base[0].value;
                console.log('suma de BASE: '+ sumaBASE);

                // Cargamos el formulario base y pasamos los valores 
                res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc});
            })
        })
    }

    // PIRUETA SIMPLE
    if(codigo == 'SSp'){
        const selectedSpin = req.body.spin;
        console.log(selectedSpin);
        
        req.getConnection((err,conn)=>{
            conn.query('SELECT rating_base as value FROM spin_base WHERE spin = ?', [selectedSpin], (error, base) => {
                if(typeDisc == 'Corto'){
                    if(numRows < 7) {
                        rowsLibre.push({
                            code: `SSp`,
                            elemento: selectedSpin,
                            base: base[0].value
                        });
                        numRows++;
                    }
                    else{
                        res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                    }
                }
                else{
                    if(numRows < 13) {
                        rowsLibre.push({
                            code: `SSp`,
                            elemento: selectedSpin,
                            base: base[0].value
                        });
                        numRows++;
                    }
                    else{
                        res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                    }
                }

                console.log(rowsLibre);

                sumaBASE += base[0].value;
                console.log('suma de BASE: '+ sumaBASE);

                // Cargamos el formulario base y pasamos los valores 
                res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc});
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
                        if(typeDisc == 'Corto'){
                            if (numRows < 7) {
                                rowsLibre.push({
                                    code: `CSp`,
                                    elemento: selectedSpin,
                                    base: total_base
                                });
                                numRows++;
                            }
                            else{
                                res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                            }
                        }
                        else{
                            if (numRows < 13) {
                                rowsLibre.push({
                                    code: `CSp`,
                                    elemento: selectedSpin,
                                    base: total_base
                                });
                                numRows++;
                            }
                            else{
                                res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                            }
                        }
                        
        
                        console.log(rowsLibre);
        
                        sumaBASE += total_base;
                        console.log('suma de BASE: '+ sumaBASE);
        
                        // Cargamos el formulario base y pasamos los valores 
                        res.render('discoLibreForm', {rowsLibre, sumaBASE, name, categoria, typeDisc});
                    }
                }) 
            }
        })
    }
    
}

module.exports ={
    goToDiscoLibreForm,
    goToaddElementInForm,
    addElement,
    resetRowsLibre,
    checkDuplicate,
    checkAxel
}
