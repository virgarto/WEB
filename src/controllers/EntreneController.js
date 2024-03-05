function goToEntreneForm (req, res){
    res.render('newEntreneDanza');
}

function createEntreneDanza(req, res){
    const {travellingB, travelling1, travelling2, travelling3, travelling4} = req.body;
    
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