function goToEntreneForm (req, res){
    res.render('newEntreneDanza');
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
            

                // Añadimos en la tabla principal los registros de la tabla temporal para que estén todos en el mismo registro
                req.getConnection((err, conn)=>{
                    conn.query('INSERT INTO entrenamiento_danza (id_travelling, id_cluster, id_pattern_sq, id_art_foot_sq, id_dance_step_sq, id_footwork_sq, id_choreo_step_sq, id_bracket_der, id_bracket_izq, id_counter_der, id_counter_izq, id_rocker_der, id_rocker_izq, id_loop_der, id_loop_izq) SELECT MAX(id_travelling), MAX(id_cluster), MAX(id_pattern_sq), MAX(id_art_foot_sq), MAX(id_dance_step_sq), MAX(id_footwork_sq), MAX(id_choreo_step_sq), MAX(id_bracket_der), MAX(id_bracket_izq), MAX(id_counter_der), MAX(id_counter_izq), MAX(id_rocker_der), MAX(id_rocker_izq), MAX(id_loop_der), MAX(id_loop_izq) FROM entrenamiento_danza_temp');

                        // Finalizamos la creación del entrenamiento añadiendo el id del usuario
                        conn.query('UPDATE entrenamiento_danza SET id_patinador = ?, fecha = CURDATE() WHERE id = (SELECT MAX(id) FROM entrenamiento_danza)', [id_pat]); 
                
                        // Borramos la información guardada en la tabla temporal
                        conn.query('DELETE FROM entrenamiento_danza_temp');
                        
                        res.render('entrenamientos', {msg: 'Nuevo entrenamiento registrado con éxito'});
                    
                });
            }         
            
        })
            
    })
}

module.exports = {
    goToEntreneForm,
    createEntreneDanza,
}