function goToEntreneForm (req, res){
    res.render('newEntreneDanza');
}

function createEntreneDanza(req, res){
    const {travellingB, cluster2} = req.body;

    console.log(travellingB, cluster2);
    
}

module.exports = {
    goToEntreneForm,
    createEntreneDanza,
}