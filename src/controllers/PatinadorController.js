function goToEntreneForm (req, res){
    res.render('newEntreneDanza');
}

function goToEntreneLibre (req, res){
    res.render('newEntreneLibre');
}

function getInforme(req, res){
    const modalidad = req.query.modalidad;
    const fecha_ini = req.query.startDate;
    const fecha_fin = req.query.endDate;
    const email = req.session.email;

    const placeholders = [];
    const values = [];
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
        'saltos_dobles': ['salchow_2', 'toeloop_2', 'flip_2', 'lutz_2', 'loop_2', 'thoren_2', 'axel_2'],
        'saltos_triples': ['salchow_3', 'toeloop_3'],
        'posiciones_avanzadas': ['inverted', 'broken', 'bryant', 'broken_forward', 'broken_sideways'],
        'discos': ['corto', 'largo'],
        'flexibilidad': ['split', 'arco']
    };

    req.getConnection((err,conn)=> {
        
        conn.query('SELECT id AS pat_ID FROM users WHERE email = ?;', [email], (err, id) =>{
            if(err){
                console.log("Error al obtener el Id del usuario: " + err);
            }
            else{
                console.log(id[0].pat_ID);
                const id_pat = id[0].pat_ID;

                if(modalidad ==  'danza'){
                    conn.query('SELECT * FROM entrenamiento_danza WHERE fecha >= ? AND fecha <= ? AND id_patinador = ?', [fecha_ini, fecha_fin, id_pat], (err, entrenes_danza) => {
                        if(err){
                            console.log('Error al obtener listado de entrenamientos Danza: ' + err);
                        }
                        else{
                            if(entrenes_danza.length > 0){
                                console.log(entrenes_danza);
                                let avgData = {};
                                
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
                                    
                                        //console.log(tablasName, avg_data);
                                        avgData[tablasName] = avg_data[0];
            
                                        //Reset placeholders y values
                                        placeholders.length = 0;
                                        values.length = 0;
            
                                        if (Object.keys(avgData).length === Object.keys(tablasLibre).length) {
                                            // Renderizamos la vista con los datos
                                            res.render("informe", { avgData, dias: entrenes_danza.length, fecha_ini, fecha_fin });
                                        }
                                    });
                                }
                            }else{
                                console.log('No se encontraron entrenamientos de modalidad danza registrados para este usuario.');
                                res.render('entrenamientos', {error: 'No se encontraron entrenamientos de modalidad danza registrados para este usuario.'});
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
                                            res.render("informe", { avgData, dias: entrenes_libre.length, fecha_ini, fecha_fin });
                                        }
                                    });
                                }
                            }
                            else{
                                console.log('No se encontraron entrenamientos de modalidad libre registrados para este usuario.');
                                res.render('entrenamientos', {error: 'No se encontraron entrenamientos de modalidad libre registrados para este usuario.'});
                            }
                        }
                    });
                }                
            }
        });
        
    })
     
 }

function createEntreneDanza(req, res){
    const {travellingB, travelling1, travelling2, travelling3, travelling4} = req.body;
    const {clusterB, cluster1, cluster2, cluster3, cluster4} = req.body;
    const {key_point1, key_point2, key_point3, key_point4} = req.body;
    const {ASqB, ASq1, ASq2, ASq3, ASq4} = req.body;
    const {DStepSqB, DStepSq1, DStepSq2, DStepSq3, DStepSq4} = req.body;
    const {FoSqB, FoSq1, FoSq2, FoSq3, FoSq4} = req.body;
    const {ChStSq} = req.body;
    const {BrDExtDetras, BrDExtDelante, BrDIntDetras, BrDIntDelante} = req.body;
    const {BrIExtDetras, BrIExtDelante, BrIIntDetras, BrIIntDelante} = req.body;
    const {CoDExtDetras, CoDExtDelante, CoDIntDetras, CoDIntDelante} = req.body;
    const {CoIExtDetras, CoIExtDelante, CoIIntDetras, CoIIntDelante} = req.body;
    const {RoDExtDetras, RoDExtDelante, RoDIntDetras, RoDIntDelante} = req.body;
    const {RoIExtDetras, RoIExtDelante, RoIIntDetras, RoIIntDelante} = req.body;
    const {LoDExtDetras, LoDExtDelante, LoDIntDetras, LoDIntDelante} = req.body;
    const {LoIExtDetras, LoIExtDelante, LoIIntDetras, LoIIntDelante} = req.body;
    const {TresDExtDetras, TresDExtDelante, TresDIntDetras, TresDIntDelante} = req.body;
    const {TresIExtDetras, TresIExtDelante, TresIIntDetras, TresIIntDelante} = req.body;
        
    req.getConnection((err, conn) => {
        conn.query('SELECT id AS pat_ID FROM users WHERE email = ?;', [req.session.email], (err, id) =>{
            if(err){
                console.log("Error al obtener el Id del usuario");
            }
            else{
                const id_pat = id[0].pat_ID;
                console.log("Id del patinador: " + id_pat);

                // Creamos los registros de cada elemento integrativo del entrenamiento
                conn.query('INSERT INTO travelling (travellingB, travelling1, travelling2, travelling3, travelling4) VALUES (?, ?, ?, ?, ?)', [travellingB, travelling1, travelling2, travelling3, travelling4]);
                conn.query('INSERT INTO cluster (clusterB, cluster1, cluster2, cluster3, cluster4) VALUES (?, ?, ?, ?, ?)', [clusterB, cluster1, cluster2, cluster3, cluster4]);
                conn.query('INSERT INTO pattern_sequence (key_point1, key_point2, key_point3, key_point4) VALUES (?, ?, ?, ?)', [key_point1, key_point2, key_point3, key_point4]);
                conn.query('INSERT INTO art_foot_sequence (ASqB, ASq1, ASq2, ASq3, ASq4) VALUES (?, ?, ?, ?, ?)', [ASqB, ASq1, ASq2, ASq3, ASq4]);
                conn.query('INSERT INTO dance_step_sequence (DStepSqB, DStepSq1, DStepSq2, DStepSq3, DStepSq4) VALUES (?, ?, ?, ?, ?)', [DStepSqB, DStepSq1, DStepSq2, DStepSq3, DStepSq4]);
                conn.query('INSERT INTO footwork_sequence (FoSqB, FoSq1, FoSq2, FoSq3, FoSq4) VALUES (?, ?, ?, ?, ?)', [FoSqB, FoSq1, FoSq2, FoSq3, FoSq4]);
                conn.query('INSERT INTO choreo_step_sequence (ChStSq) VALUES (?)', [ChStSq]);
                conn.query('INSERT INTO bracket_derecho (BrDExtDetras, BrDExtDelante, BrDIntDetras, BrDIntDelante) VALUES (?, ?, ?, ?)', [BrDExtDetras, BrDExtDelante, BrDIntDetras, BrDIntDelante]);
                conn.query('INSERT INTO bracket_izquierdo (BrIExtDetras, BrIExtDelante, BrIIntDetras, BrIIntDelante) VALUES (?, ?, ?, ?)', [BrIExtDetras, BrIExtDelante, BrIIntDetras, BrIIntDelante]);
                conn.query('INSERT INTO counter_derecho (CoDExtDetras, CoDExtDelante, CoDIntDetras, CoDIntDelante) VALUES (?, ?, ?, ?)', [CoDExtDetras, CoDExtDelante, CoDIntDetras, CoDIntDelante]);
                conn.query('INSERT INTO counter_izquierdo (CoIExtDetras, CoIExtDelante, CoIIntDetras, CoIIntDelante) VALUES (?, ?, ?, ?)', [CoIExtDetras, CoIExtDelante, CoIIntDetras, CoIIntDelante]);
                conn.query('INSERT INTO rocker_derecho (RoDExtDetras, RoDExtDelante, RoDIntDetras, RoDIntDelante) VALUES (?, ?, ?, ?)', [RoDExtDetras, RoDExtDelante, RoDIntDetras, RoDIntDelante]);
                conn.query('INSERT INTO rocker_izq (RoIExtDetras, RoIExtDelante, RoIIntDetras, RoIIntDelante) VALUES (?, ?, ?, ?)', [RoIExtDetras, RoIExtDelante, RoIIntDetras, RoIIntDelante]);
                conn.query('INSERT INTO loop_derecho (LoDExtDetras, LoDExtDelante, LoDIntDetras, LoDIntDelante) VALUES (?, ?, ?, ?)', [LoDExtDetras, LoDExtDelante, LoDIntDetras, LoDIntDelante]);
                conn.query('INSERT INTO loop_izquierdo (LoIExtDetras, LoIExtDelante, LoIIntDetras, LoIIntDelante) VALUES (?, ?, ?, ?)', [LoIExtDetras, LoIExtDelante, LoIIntDetras, LoIIntDelante]);
                conn.query('INSERT INTO tres_derecho (TresDExtDetras, TresDExtDelante, TresDIntDetras, TresDIntDelante) VALUES (?, ?, ?, ?)', [TresDExtDetras, TresDExtDelante, TresDIntDetras, TresDIntDelante]);
                conn.query('INSERT INTO tres_izquierdo (TresIExtDetras, TresIExtDelante, TresIIntDetras, TresIIntDelante) VALUES (?, ?, ?, ?)', [TresIExtDetras, TresIExtDelante, TresIIntDetras, TresIIntDelante]);
            

                // Añadimos en la tabla principal los registros de la tabla temporal para que estén todos en el mismo registro
                conn.query('INSERT INTO entrenamiento_danza (id_travelling, id_cluster, id_pattern_sq, id_art_foot_sq, id_dance_step_sq, id_footwork_sq, id_choreo_step_sq, id_bracket_der, id_bracket_izq, id_counter_der, id_counter_izq, id_rocker_der, id_rocker_izq, id_loop_der, id_loop_izq, id_tres_der, id_tres_izq) SELECT MAX(id_travelling), MAX(id_cluster), MAX(id_pattern_sq), MAX(id_art_foot_sq), MAX(id_dance_step_sq), MAX(id_footwork_sq), MAX(id_choreo_step_sq), MAX(id_bracket_der), MAX(id_bracket_izq), MAX(id_counter_der), MAX(id_counter_izq), MAX(id_rocker_der), MAX(id_rocker_izq), MAX(id_loop_der), MAX(id_loop_izq), MAX(id_tres_der), MAX(id_tres_izq) FROM entrenamiento_danza_temp');

                // Finalizamos la creación del entrenamiento añadiendo el id del usuario
                conn.query('UPDATE entrenamiento_danza SET id_patinador = ?, fecha = CURDATE() WHERE id = (SELECT MAX(id) FROM entrenamiento_danza)', [id_pat]); 
        
                // Borramos la información guardada en la tabla temporal
                conn.query('DELETE FROM entrenamiento_danza_temp');
                
                res.render('entrenamientos', {msg: 'Nuevo entrenamiento de danza registrado con éxito'});
                
            }         
            
        })
            
    })
}

function createEntreneLibre(req, res){
    const {upright_izq, forward_izq, layback_izq, sideways_izq, split_izq, torso_izq, biellman_izq, biellman_heel_izq} = req.body;
    const {upright_der, forward_der, layback_der, sideways_der, split_der, torso_der, biellman_der,biellman_heel_der} = req.body;
    const {sit_izq, sit_forward_izq, sit_sideways_izq, behind_izq, twist_izq} = req.body;
    const {sit_der, sit_forward_der, sit_sideways_der, behind_der, twist_der} = req.body;
    const {exterior_izq, interior_izq, layover_izq, camel_forward_izq, camel_sideways_izq} = req.body;
    const {exterior_der, interior_der, layover_der, camel_forward_der, camel_sideways_der} = req.body;
    const {heel_izq, heel_forward_izq, heel_sideways_izq, heel_layover_izq} = req.body;
    const {heel_der, heel_forward_der, heel_sideways_der, heel_layover_der} = req.body;
    const {waltz_jump, salchow, toeloop, flip, lutz, loop_simple, thoren, axel} = req.body;
    const {salchow_2, Toeloop_2, flip_2, lutz_2, loop_2, thoren_2, axel_2} = req.body;
    const {salchow_3, Toeloop_3} = req.body;
    const {pos_inverted, pos_broken, pos_bryant, pos_broken_forw, pos_broken_sideways} = req.body;
    const {disc_corto, disc_largo} = req.body;
    const {flexi_split, flexi_arco} = req.body;
        
    req.getConnection((err, conn) => {
        
        conn.query('SELECT id AS pat_ID FROM users WHERE email = ?;', [req.session.email], (err, id) =>{
            if(err){
                console.log("Error al obtener el Id del usuario");
            }
            else{
                const id_pat = id[0].pat_ID;
                console.log("Id del patinador: " + id_pat);

                // Creamos los registros de cada elemento integrativo del entrenamiento
                conn.query('INSERT INTO upright_izquierdo (upright, forward, layback, sideways, split, torso, biellman, biellman_heel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [upright_izq, forward_izq, layback_izq, sideways_izq, split_izq, torso_izq, biellman_izq, biellman_heel_izq]);
                conn.query('INSERT INTO upright_derecho (upright, forward, layback, sideways, split, torso, biellman, biellman_heel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [upright_der, forward_der, layback_der, sideways_der, split_der, torso_der, biellman_der, biellman_heel_der]);
                conn.query('INSERT INTO sit_izquierdo (sit, forward, sideways, behind, twist) VALUES (?, ?, ?, ?, ?)', [sit_izq, sit_forward_izq, sit_sideways_izq, behind_izq, twist_izq]);
                conn.query('INSERT INTO sit_derecho (sit, forward, sideways, behind, twist) VALUES (?, ?, ?, ?, ?)', [sit_der, sit_forward_der, sit_sideways_der, behind_der, twist_der]);
                conn.query('INSERT INTO camel_izquierdo (exterior, interior, layover, forward, sideways) VALUES (?, ?, ?, ?, ?)', [exterior_izq, interior_izq, layover_izq, camel_forward_izq, camel_sideways_izq]);
                conn.query('INSERT INTO camel_derecho (exterior, interior, layover, forward, sideways) VALUES (?, ?, ?, ?, ?)', [exterior_der, interior_der, layover_der, camel_forward_der, camel_sideways_der]);
                conn.query('INSERT INTO heel_izquierdo (heel, forward, sideways, layover) VALUES (?, ?, ?, ?)', [heel_izq, heel_forward_izq, heel_sideways_izq, heel_layover_izq]);
                conn.query('INSERT INTO heel_derecho (heel, forward, sideways, layover) VALUES (?, ?, ?, ?)', [heel_der, heel_forward_der, heel_sideways_der, heel_layover_der]);
                conn.query('INSERT INTO saltos_simples (waltz_jump, salchow, toeloop, flip, lutz, loop_simple, thoren, axel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [waltz_jump, salchow, toeloop, flip, lutz, loop_simple, thoren, axel]);
                conn.query('INSERT INTO saltos_dobles (salchow_2, toeloop_2, flip_2, lutz_2, loop_2, thoren_2, axel_2) VALUES (?, ?, ?, ?, ?, ?, ?)', [salchow_2, Toeloop_2, flip_2, lutz_2, loop_2, thoren_2, axel_2]);
                conn.query('INSERT INTO saltos_triples (salchow_3, toeloop_3) VALUES (?, ?)', [salchow_3, Toeloop_3]);
                conn.query('INSERT INTO posiciones_avanzadas (inverted, broken, bryant, broken_forward, broken_sideways) VALUES (?, ?, ?, ?, ?)', [pos_inverted, pos_broken, pos_bryant, pos_broken_forw, pos_broken_sideways]);
                conn.query('INSERT INTO discos (corto, largo) VALUES (?, ?)', [disc_corto, disc_largo]);
                conn.query('INSERT INTO flexibilidad (split, arco) VALUES (?, ?)', [flexi_split, flexi_arco]);

                // Añadimos en la tabla principal los registros de la tabla temporal para que estén todos en el mismo registro
                conn.query('INSERT INTO entrenamiento_libre (id_upright_izq, id_upright_der, id_sit_izq, id_sit_der, id_camel_izq, id_camel_der, id_heel_izq, id_heel_der, id_saltos_simples, id_saltos_dobles, id_saltos_triples, id_pos_avanzadas, id_discos, id_flexibilidad) SELECT MAX(id_upright_izq), MAX(id_upright_der), MAX(id_sit_izq), MAX(id_sit_der), MAX(id_camel_izq), MAX(id_camel_der), MAX(id_heel_izq), MAX(id_heel_der), MAX(id_saltos_simples), MAX(id_saltos_dobles), MAX(id_saltos_triples), MAX(id_pos_avanzadas), MAX(id_discos), MAX(id_flexibilidad) FROM entrenamiento_libre_temp');

                // Finalizamos la creación del entrenamiento añadiendo el id del usuario
                conn.query('UPDATE entrenamiento_libre SET id_patinador = ?, fecha = CURDATE() WHERE id = (SELECT MAX(id) FROM entrenamiento_libre)', [id_pat]); 
        
                // Borramos la información guardada en la tabla temporal
                conn.query('DELETE FROM entrenamiento_libre_temp');
                
                res.render('entrenamientos', {msg: 'Nuevo entrenamiento libre registrado con éxito'});
                  
            }         
            
        })
            
    })
}



module.exports = {
    goToEntreneForm,
    createEntreneDanza,
    goToEntreneLibre,
    createEntreneLibre,
    getInforme
}