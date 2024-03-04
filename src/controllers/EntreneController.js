function goToEntreneForm (req, res){
    res.render('newEntreneDanza');
}

function createEntreneDanza(req, res){
    const data = req.body;
    
    console.log(data);
}

module.exports = {
    goToEntreneForm,
    createEntreneDanza,
}