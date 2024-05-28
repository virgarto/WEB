/*****************************************************/
/* Función para acceder al formulario para generar   */
/* un informe como entrenador                        */
/*****************************************************/
function goToInforme (req, res){
    // Recogemos el email del patinador seleccionado
    const email = req.query.email;

    res.render('informeEntrenador', {rol: req.session.rol, email});
}

/*****************************************************/
/* Función que crea el informe del patinador         */
/* seleccionado por el entrenador                    */
/*****************************************************/
function getInformeEntrenador(req,res) {
    // Variables para generar informa
    const patinador_email = req.query.patinador;
    const modalidad = req.query.modalidad;
    const fecha_ini = req.query.startDate;
    const fecha_fin = req.query.endDate;

    // Variables para crear la consulta dinámica
    // placeholder se encargará de guardar las '?' de cada  consulta
    // values almacena los valores reales que reemplazarán los ?
    const placeholders = [];
    const values = [];

    // Tablas de modalidad danza y libre
    const tablasDanza = {
        'art_foot_sequence': ['ASqB', 'ASq1', 'ASq2', 'ASq3', 'ASq4'],
        'bracket_derecho': ['BrDExtDetras', 'BrDExtDelante', 'BrDIntDetras', 'BrDIntDelante'], 
        'bracket_izquierdo': ['BrIExtDetras', 'BrIExtDelante', 'BrIIntDetras', 'BrIIntDelante'], 
        'choreo_step_sequence': ['ChStSq'], 
        'cluster': ['clusterB', 'cluster1', 'cluster2', 'cluster3', 'cluster4'], 
        'counter_derecho': ['CoDExtDetras', 'CoDExtDelante', 'CoDIntDetras', 'CoDIntDelante'], 
        'counter_izquierdo': ['CoIExtDetras', 'CoIExtDelante', 'CoIIntDetras', 'CoIIntDelante'], 
        'dance_step_sequence': ['DStepSqB', 'DStepSq1', 'DStepSq2', 'DStepSq3', 'DStepSq4'], 
        'footwork_sequence': ['FoSqB', 'FoSq1', 'FoSq2', 'FoSq3', 'FoSq4'], 
        'loop_derecho': ['LoDExtDetras', 'LoDExtDelante', 'LoDIntDetras', 'LoDIntDelante'], 
        'loop_izquierdo': ['LoIExtDetras', 'LoIExtDelante', 'LoIIntDetras', 'LoIIntDelante'], 
        'pattern_sequence': ['key_point1', 'key_point2', 'key_point3', 'key_point4'], 
        'rocker_derecho': ['RoDExtDetras', 'RoDExtDelante', 'RoDIntDetras', 'RoDIntDelante'], 
        'rocker_izq': ['RoIExtDetras', 'RoIExtDelante', 'RoIIntDetras', 'RoIIntDelante'],
        'travelling': ['travellingB', 'travelling1', 'travelling2', 'travelling3', 'travelling4'],
        'tres_derecho': ['TresDExtDetras', 'TresDExtDelante', 'TresDIntDetras', 'TresDIntDelante'], 
        'tres_izquierdo': ['TresIExtDetras', 'TresIExtDelante', 'TresIIntDetras', 'TresIIntDelante'],
    };

    const tablasLibre = {
        'upright_izquierdo': ['upright', 'forward', 'layback', 'sideways', 'split', 'torso', 'biellman', 'biellman_heel'],
        'upright_derecho': ['upright', 'forward', 'layback', 'sideways', 'split', 'torso', 'biellman', 'biellman_heel'],
        'sit_izquierdo': ['sit', 'forward', 'sideways', 'behind', 'twist'],
        'sit_derecho': ['sit', 'forward', 'sideways', 'behind', 'twist'],
        'camel_izquierdo': ['exterior', 'interior', 'layover', 'forward', 'sideways'],
        'camel_derecho': ['exterior', 'interior', 'layover', 'forward', 'sideways'],
        'heel_izquierdo': ['heel', 'forward', 'sideways', 'layover'],
        'heel_derecho': ['heel', 'forward', 'sideways', 'layover'],
        'saltos_simples': ['waltz_jump', 'salchow', 'toeloop', 'flip', 'lutz', 'loop_simple', 'thoren', 'axel'],
        'saltos_dobles': ['salchow', 'toeloop', 'flip', 'lutz', 'loop_doble', 'thoren', 'axel'],
        'saltos_triples': ['salchow', 'toeloop'],
        'posiciones_avanzadas': ['inverted', 'broken', 'bryant', 'broken_forward', 'broken_sideways'],
        'discos': ['corto', 'largo'],
        'flexibilidad': ['split', 'arco']
    };

    req.getConnection((err, conn) => {
        console.log(patinador_email);
        // Obtenemos el id del patinador seleccionado
        conn.query('SELECT id AS pat_ID FROM users WHERE email = ?', [patinador_email], (error, id) => {
            if(err){
                console.log("Error al obtener el Id del usuario" + error);
            }else{
                console.log('Id del patinador: ' + id[0].pat_ID);
                const id_pat = id[0].pat_ID;

                // Diferenciamos la modalidad seleccionada para obtener los entrenamientos realizados entre las fechas introducidas
                if(modalidad ==  'danza'){
                    conn.query('SELECT * FROM entrenamiento_danza WHERE fecha >= ? AND fecha <= ? AND id_patinador = ?', [fecha_ini, fecha_fin, id_pat], (err, entrenes_danza) => {
                        if(err){
                            console.log('Error al obtener listado de entrenamientos Danza: ' + err);
                        }
                        else{
                            if(entrenes_danza.length > 0){
                                console.log(entrenes_danza);
                                let avgData = {};
                                
                                // Creamos la consula dinámica, por cada iteración se añade al array placeholder un nuevo '?' y values el id correspondiente
                                for(let tablasName in  tablasDanza) {
                                    const columnNames = tablasDanza[tablasName];
                                    for (let i = 0; i < entrenes_danza.length; i++) {
                                        placeholders.push('?');
                                        values.push(entrenes_danza[i].id);
                                    }


                                    const sql = 'SELECT ' + columnNames.map(c => 'GROUP_CONCAT('+ c +') AS '+ c ).join(',') + ' FROM ( SELECT ' + columnNames.join(',') + ' FROM ' + tablasName + ' WHERE id IN ('+ placeholders.join(',') + ') ) AS subquery'; 
                                
                                    conn.query(sql, values, (err, avg_data) => {
                                        if (err) {
                                            console.error(err);
                                            return;
                                        }
                                    
                                        //guardamos la información obtenida
                                        avgData[tablasName] = avg_data[0];
            
                                        //Reseteo placeholders y values
                                        placeholders.length = 0;
                                        values.length = 0;
            
                                        if (Object.keys(avgData).length === Object.keys(tablasLibre).length) {
                                            // Renderizamos la vista con los datos
                                            res.render("informe", { avgData, dias: entrenes_danza.length, fecha_ini, fecha_fin, rol: req.session.rol });
                                        }
                                    });
                                }
                            }else{
                                // no hay entrenamientos entre las fechas
                                console.log('No se encontraron entrenamientos de modalidad danza registrados para este usuario.');
                                res.render('informeEntrenador', {error: 'No se encontraron entrenamientos de modalidad danza registrados para este usuario.'});
                            }
                        }
                    });
                }else{
                    conn.query('SELECT * FROM entrenamiento_libre WHERE fecha >= ? AND fecha <= ? AND id_patinador = ?', [fecha_ini, fecha_fin, id_pat], (err, entrenes_libre) => {
                        if (err) {
                            console.log('Error al obtener listado de entrenamientos Libre: ' + err);
                        }else{
                            if(entrenes_libre.length  > 0){
                                console.log(entrenes_libre);

                                let avgData = {};
            
                                for(let tablasName in  tablasLibre) {
                                    const columnNames = tablasLibre[tablasName];
            
                                    for (let i = 0; i < entrenes_libre.length; i++) {
                                        placeholders.push('?');
                                        values.push(entrenes_libre[i].id);
                                    }
            
                                    const sql = 'SELECT ' + columnNames.map(c => 'GROUP_CONCAT('+ c +') AS '+ c ).join(',') + ' FROM ( SELECT ' + columnNames.join(',') + ' FROM ' + tablasName + ' WHERE id IN ('+ placeholders.join(',') + ') ) AS subquery'; 
                                
                                    conn.query(sql, values, (err, avg_data) => {
                                        if (err) {
                                            console.error(err);
                                            return;
                                        }
                                    
                                        console.log(tablasName, avg_data);
                                        avgData[tablasName] = avg_data[0];
                                        
                                        //Reset placeholders y values
                                        placeholders.length = 0;
                                        values.length = 0;
            
                                        if (Object.keys(avgData).length === Object.keys(tablasLibre).length) {
                                            // Renderizamos la vista con los datos
                                            res.render("informe", { avgData, dias: entrenes_libre.length, fecha_ini, fecha_fin, rol: req.session.rol });
                                        }
                                    });
                                }
                            }
                            else{
                                console.log('No se encontraron entrenamientos de modalidad libre registrados para este usuario.');
                                res.render('informeEntrenador', {error: 'No se encontraron entrenamientos de modalidad libre registrados para este usuario.'});
                            }
                        }
                    });
                }
            }
            
        })
    })
}

module.exports = {
    goToInforme,
    getInformeEntrenador,
}