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

    // Si accedemos como entrenador necesitamos listado de patinadores para rellenar el form
    if(req.session.rol == 'Entrenador'){
        req.getConnection((error, conn) =>{
            conn.query('SELECT username AS Nombre, categoria_act AS Categoria FROM users WHERE rol = "Patinador/a" AND club = ?', [req.session.club], (err, listPat) => {
                res.render('discoLibre', {listPat, rol: req.session.rol, categoria: req.session.categoria, name:  req.session.name, typeDisc});
            });
        });
    }
    else{
        res.render('discoLibre', {rol: req.session.rol, categoria: req.session.categoria, name:  req.session.name, typeDisc}); 
    }

    
}

/*****************************************************/
/* Función para acceder al formulario para crear una */
/* coreografía de Modalidad DANZA: Disco DANZA Free  */
/*****************************************************/
function goTodiscoDanzaFreeForm (req, res){
    const typeDisc = req.query.typeDisc;

    // Reiniciamos el array con la información de la Coreografía así como la BASE
    resetRowsDanza();

    // Si accedemos como entrenador necesitamos listado de patinadores para rellenar el form
    if(req.session.rol == 'Entrenador'){
        req.getConnection((error, conn) =>{
            conn.query('SELECT username AS Nombre, categoria_act AS Categoria FROM users WHERE rol = "Patinador/a" AND club = ?', [req.session.club], (err, listPat) => {
                res.render('discoDanzaFree', {listPat, rol: req.session.rol, categoria: req.session.categoria, name:  req.session.name, typeDisc});
            });
        });
    }
    else{
        res.render('discoDanzaFree', {rol: req.session.rol, categoria: req.session.categoria, name: req.session.name, typeDisc});  
    }
}


/*****************************************************/
/* Función para acceder al formulario para crear una */
/* coreografía de Modalidad DANZA: Disco DANZA Free  */
/*****************************************************/
function goTodiscoDanzaStyleForm (req, res){
    const categoria = req.session.categoria;
    let typeDisc;

    if(categoria == 'Alevin' || categoria == 'Infantil' || categoria == 'Benjamin'){
        typeDisc = 'Danza Obligatoria';
    }
    else{
         typeDisc = 'Style Dance';
    }

    // Reiniciamos el array con la información de la Coreografía así como la BASE
    resetRowsDanza();

    // Si accedemos como entrenador necesitamos listado de patinadores para rellenar el form
    if(req.session.rol == 'Entrenador'){
        req.getConnection((error, conn) =>{
            conn.query('SELECT username AS Nombre, categoria_act AS Categoria FROM users WHERE rol = "Patinador/a" AND club = ?', [req.session.club], (err, listPat) => {
                res.render('discoDanzaStyle', {listPat, rol: req.session.rol, categoria: req.session.categoria, name:  req.session.name, typeDisc});
            });
        });
    }
    else{
        res.render('discoDanzaStyle', {rol: req.session.rol, categoria: req.session.categoria, name: req.session.name, typeDisc});  
    }

}


/*****************************************************/
/* Función para acceder al formulario para añadir a  */
/* la coreogría un nuevo elemento. También controla  */
/* que se pueda añadir más elementos a los disco     */
/*****************************************************/
function goToaddElementLibre (req, res){
    // Variables del form
    const codigo = req.query.codigo;
    const name = req.query.name;
    const categoria = req.query.categoria;
    const typeDisc = req.query.typeDisc;

    // Comprobamos que se puedan añadir o no más elementos al form dependiendo del tipo
    if(typeDisc == 'Corto'){
        if(rowsLibre.length == 7){
            return res.render('discoLibre', {rowsLibre, sumaBASE, name, typeDisc, categoria, msg: 'Ya no se pueden añadir más elementos al programa.'})
        }
    }
    else{
        if(rowsLibre.length == 13){
            return res.render('discoLibre', {rowsLibre, sumaBASE, name, typeDisc, categoria, msg: 'Ya no se pueden añadir más elementos al programa.'})
        }
    }
    
    res.render('addElementLibre', {rol: req.session.rol, codigo, name, categoria, typeDisc});
}


/*****************************************************/
/* Función para acceder al formulario para añadir a  */
/* la coreogría un nuevo elemento. También controla  */
/* que se pueda añadir más elementos a los disco     */
/*****************************************************/
function goToaddElementDanza (req, res){
    // Variables del form
    const codigo = req.query.codigo;
    const name = req.query.name;
    const categoria = req.query.categoria;
    const typeDisc = req.query.typeDisc;
    
    res.render('addElementDanza', {rol: req.session.rol, codigo, name, categoria, typeDisc});
}

/*****************************************************/
/* Variables que guardan los programas Libre y Danza */
/* y el numero de BASE  que tiene la coreografía     */
/*****************************************************/

let rowsLibre = [];
let rowsDanza = [];
let sumaBASE = 0;
let numRows = 0;


/*****************************************************/
/* Función de reseteo del Array de rowsLibre y BASE  */
/*****************************************************/
function resetRowsLibre(){
    rowsLibre = [];
    sumaBASE = 0;
    numRows = 0;
}

/*****************************************************/
/* Función de reseteo del Array de rowsDanza y BASE  */
/*****************************************************/
function resetRowsDanza(){
    rowsDanza = [];
    sumaBASE = 0;
    numRows = 0;
}


/**********************************************************/
/* Función de chequeo para comprobar si ya se ha añadido  */
/* un salto de tipo Axel en el programa                   */
/**********************************************************/
function checkAxel(selectedSalto){
    let hayAxel = false;

    for(const row of rowsLibre){
        if(row.code == 'SJu'){
            const isAxel = row.elemento.includes(selectedSalto) || (selectedSalto === 'axel' && row.elemento.includes('axel_2')) || (selectedSalto === 'axel_2' && row.elemento.includes('axel'));
            if (isAxel) {
                hayAxel = true;
                break;
            }
        }
    }

    return hayAxel;
}

/**********************************************************/
/* Función de chequeo para comprobar si ya se ha añadido  */
/* el combinado de saltos introducido en el form          */
/**********************************************************/
function checkDuplicate(selectedSalto){
    let isDuplicate = false;

    for (const row of rowsLibre) {
        // Comparamos cada elemento del array elemento con el introducido
        if (selectedSalto.every(value => Array.from(row.elemento).includes(value))) {
            isDuplicate = true;
            break;
        }
    }

    return isDuplicate;
}

/*****************************************************/
/* Función que según el codigo del elemento, añade a */
/* la coreografía el salto o la pirueta junto con su */
/* BASE                                              */
/*****************************************************/
function addElementLibre(req, res){
    // Variables del form
    const codigo = req.body.code;
    const name = req.body.patinador;
    const categoria = req.body.categoria;
    
    const typeDisc = req.body.typeDisc;

    switch(codigo){
        case 'SJu':
            const selectedSalto = req.body.salto;

            // Comprobamos si hay Axel
            let hayAxel = checkAxel(selectedSalto);
            
            // Si ya se ha introducido un axel y ha seleccionado otro salta el msg de que no se puede añadir otra vez
            if(hayAxel && (selectedSalto == 'axel' || selectedSalto == 'axel_2')){
                res.render('addElementLibre', {rol: req.session.rol, codigo, name, categoria, typeDisc, msg: 'No se puede seleccionar un Axel de nuevo'});
            }
            else{
                req.getConnection((error, conn) =>{
                    // Obtenemos BASE del salto seleccionado
                    conn.query('SELECT rating_base AS value FROM saltos_base WHERE salto_nombre = ?', [selectedSalto], (error, base) => {
                        
                        if(typeDisc == 'Corto'){
                            if (numRows < 7) {
                                rowsLibre.push({
                                    code: `SJu`,
                                    elemento: selectedSalto,
                                    base: base[0].value
                                });
                                numRows++;
                            }
                            else{
                                // CUANDO RECARGAS LAS PAGINA Y SE DUPLICA EL ULTIMO ELEMENTO INTRODUCIDO
                                res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                            }
                        }
                        else{
                            if (numRows < 13) {
                                // Si se es de estas categorias, un salto despues de la mitad del programa incrementa su valor 10%
                                if(categoria == 'Cadete' || categoria == 'Juvenil' || categoria == 'Junior' || categoria == 'Senior'){
                                    
                                    if(numRows >= 6){
                                        let base_salto = base[0].value + (base[0].value * 0.10);
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
                                res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                            }
                        }

                        sumaBASE += (base[0].value);

                        // Cargamos el formulario base y pasamos los valores 
                        res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc});
                    })
                })
            }
        break;

        case 'CoJ':
            const combSalto = req.body.salto;
            const selectedCombSalto = combSalto.split(",");

            // Comprobamos que no haya un combinado igual
            let isDuplicate = checkDuplicate(selectedCombSalto);

            // Si hay un combo igual salta error
            if (isDuplicate) {
                res.render('addElementLibre', {rol: req.session.rol, codigo, name, categoria, typeDisc, msg: 'Este Combinado de Saltos ya ha sido introducido en el programa'})
            }
            else{
                req.getConnection((error, conn) =>{
                    // Tenemos en cuenta la incrementación de valor de saltos según el reglamento
                    let base_final;
                    // Variables que guardan la puntuación total de los saltos y el array con todos los BASE
                    let total_base = 0;
                    let base_salto = []

                    // Recorremos el array con los saltos seleccionados
                    for(i = 0; i < selectedCombSalto.length; i++){
                        var salto = selectedCombSalto[i];

                        // Obtenemos BASE para cada salto
                        conn.query('SELECT rating_base AS value FROM saltos_base WHERE salto_nombre = ?', [salto], (error, base) => {
                            // Guardamos el valor en el array y lo sumamos al total
                            base_salto.push(base[0].value);
                            // Variable para sumar los porcentajes
                            base_final = base[0].value;

                            // Comprobamos la categoría y luego los dobles y triples consecutivos
                            if(i > 0){
                                let previousSalto = selectedCombSalto[i-1];
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
                            
                            if(typeDisc == 'Corto'){
                                total_base += base[0].value;
                            }
                            

                            // Comprobamos que estén todos y pasamos la información a la tabla de la coreografía
                            if(base_salto.length == selectedCombSalto.length){
                                if(typeDisc == 'Corto'){
                                    if (numRows < 7) {
                                        rowsLibre.push({
                                            code: `CoJ`,
                                            elemento: selectedCombSalto,
                                            base: total_base.toFixed(2)
                                        });
                                        numRows++;
                                    }
                                    else{
                                        res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                                    }
                                }
                                else{
                                    if (numRows < 13) {
                                        rowsLibre.push({
                                            code: `CoJ`,
                                            elemento: selectedCombSalto,
                                            base: total_base.toFixed(2)
                                        });
                                        numRows++;
                                    }
                                    else{
                                        res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                                    }
                                }
                
                                sumaBASE += total_base;
                
                                // Cargamos el formulario base y pasamos los valores 
                                res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria , typeDisc});
                                
                            }
                        }) 
                    }
                })
            }
        break;

        case 'FoSq':
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
                            res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
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
                            res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                        }
                    }
                    

                    sumaBASE += (base[0].value);

                    // Cargamos el formulario base y pasamos los valores 
                    res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc});
                })
            })
        break;

        case 'SSp':
            const selectedSpin = req.body.spin;
            
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
                            res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
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
                            res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                        }
                    }


                    sumaBASE += (base[0].value);

                    // Cargamos el formulario base y pasamos los valores 
                    res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc});
                })
                
            })
        break;

        case 'CSp':
            const CombSpin = req.body.spin;
            const selectedCombSpin = CombSpin.split(",");
            
            req.getConnection((error, conn) =>{
                // Variables que guardan la puntuación total de los saltos y el array con todos los BASE
                let total_base = 0;
                let base_salto = []

                // Recorremos el array con los saltos seleccionados
                for(i = 0; i < selectedCombSpin.length; i++){
                    var spin = selectedCombSpin[i];

                    // Obtenemos BASE para cada salto
                    conn.query('SELECT rating_base AS value FROM spin_base WHERE spin = ?', [spin], (error, base) => {
                        // Guardamos el valor en el array y lo sumamos al total
                        base_salto.push(base[0].value);
                        total_base += base[0].value;

                        // Comprobamos que estén todos y pasamos la información a la tabla de la coreografía
                        if(base_salto.length == selectedCombSpin.length){
                            if(typeDisc == 'Corto'){
                                if (numRows < 7) {
                                    rowsLibre.push({
                                        code: `CSp`,
                                        elemento: selectedCombSpin,
                                        base: total_base.toFixed(2)
                                    });
                                    numRows++;
                                }
                                else{
                                    res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                                }
                            }
                            else{
                                if (numRows < 13) {
                                    rowsLibre.push({
                                        code: `CSp`,
                                        elemento: selectedCombSpin,
                                        base: total_base.toFixed(2)
                                    });
                                    numRows++;
                                }
                                else{
                                    res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                                }
                            }
                                  
                            sumaBASE += total_base;
            
                            // Cargamos el formulario base y pasamos los valores 
                            res.render('discoLibre', {rol: req.session.rol, rowsLibre, sumaBASE, name, categoria, typeDisc});
                        }
                    }) 
                }
            })
        break;

        default:
            res.status(400).send('Código no válido');
    }
    
}

/*****************************************************/
/* Función que según el codigo del elemento, añade a */
/* la coreografía el elemento seleccionado junto con */
/* su BASE                                           */
/*****************************************************/
function addElementDanza(req, res){
    // Variables del form
    const codigo = req.body.code;
    const name = req.body.patinador;
    const categoria = req.body.categoria;
    const selectedElement = req.body.element;
    const typeDisc = req.body.typeDisc;
    
    if(codigo == 'PtSq'){
        if (numRows < 7) {
            rowsDanza.push({
                code: codigo,
                elemento: selectedElement,
                base: 0
            });
            numRows++;

            res.render('discoDanzaStyle', {rol: req.session.rol, rowsDanza, sumaBASE, name, categoria, typeDisc});
        }
        else{
            res.render('discoDanzaStyle', {rol: req.session.rol, rowsDanza, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
        }
    }
    else if(codigo == 'PtSq_ob'){
        const keyPoints = [req.body.key_point1, req.body.key_point2, req.body.key_point3, req.body.key_point4]

        if(categoria != 'Benjamin'){
            if(numRows < 2){
                rowsDanza.push({
                    code: codigo,
                    elemento: keyPoints,
                    base: '-'
                });
                numRows++;

                res.render('discoDanzaStyle', {rol: req.session.rol, rowsDanza, sumaBASE, name, categoria, typeDisc});
            }
        }else{
            // Los Benjamines solo pueden hacer 1 danza obligatoria
            if(numRows < 1){
                rowsDanza.push({
                    code: codigo,
                    elemento: keyPoints,
                    base: '-'
                });
                numRows++;

                res.render('discoDanzaStyle', {rol: req.session.rol, rowsDanza, sumaBASE, name, categoria, typeDisc});
            }
            else{
                res.render('discoDanzaStyle', {rol: req.session.rol, rowsDanza, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
            }
        }
    }
    else{
        req.getConnection((err,conn)=>{
            conn.query('SELECT rating_base as value FROM danza_bases WHERE elemento = ?', [selectedElement], (error, base) => {
                let base_final = base[0].value
                if (numRows < 7) {
                    rowsDanza.push({
                        code: codigo,
                        elemento: selectedElement,
                        base: base_final.toFixed(2)
                    });
                    numRows++;
                }
                else{
                    res.render('discoDanzaFree', {rol: req.session.rol, rowsDanza, sumaBASE, name, categoria, typeDisc, msg: 'Ya no se pueden añadir más elementos al programa.'})
                }
    
                sumaBASE += base[0].value;
    
                // Cargamos el formulario base y pasamos los valores 
                if(typeDisc == 'Free Dance'){
                    res.render('discoDanzaFree', {rol: req.session.rol, rowsDanza, sumaBASE, name, categoria, typeDisc});
                }
                else{
                    res.render('discoDanzaStyle', {rol: req.session.rol, rowsDanza, sumaBASE, name, categoria, typeDisc});
                }
                
            })
        })
    }
    
}


module.exports ={
    goToDiscoLibreForm,
    goToaddElementLibre,
    addElementLibre,
    resetRowsLibre,
    checkDuplicate,
    checkAxel,
    resetRowsDanza,
    goTodiscoDanzaFreeForm,
    goToaddElementDanza,
    addElementDanza,
    goTodiscoDanzaStyleForm,
}
