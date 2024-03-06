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
        conn.query('INSERT INTO travelling (travellingB, travelling1, travelling2, travelling3, travelling4) VALUES (?, ?, ?, ?, ?)', [travellingB, travelling1, travelling2, travelling3, travelling4]);
        
        conn.query('SELECT MAX(id) AS LastID FROM travelling;', (err, id) =>{
            conn.query('INSERT ')
        })
            
    });
}

module.exports = {
    goToEntreneForm,
    createEntreneDanza,
}