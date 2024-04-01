/***************************************************************/
/* Función que para cargar la pagina home                      */
/***************************************************************/
function home (req, res){
    res.render('home', {rol: req.session.rol});
}

/***************************************************************/
/* Función que para cargar la pagina perfil                      */
/***************************************************************/
function perfil (req, res){
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ //Si hay sesión creada le manda al perfil
        res.redirect('/');
    }
}

/***************************************************************/
/* Función que para cargar la pagina Entrenamientos Patinador  */
/***************************************************************/
function entrenamientosPatinador (req, res){
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ 
        res.render('entrenamientos', {email: req.session.email});     
    }
}

/***************************************************************/
/* Función que para cargar la pagina Entrenamientos Entrenador */
/* la cual esta formada de un listado de los patinadores que   */
/* conforman el club al que pertenece dicho entrenador         */
/***************************************************************/
function entrenamientosEntrenador (req, res){
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ 
        // Nos conectamos a la BBDD para obtener el listado
        req.getConnection((err, conn) => {
            if(err) 
                console.log('Error al conectarse a la BBDD: ' + err);
            else{
                // Obtenemos mediante una query el listado de patinadores en su mismo club
                conn.query('SELECT username AS Nombre, DATE_FORMAT(fecha_nacimiento, "%b %d, %Y") AS Año, email AS Email, categoria_act AS Categoria, categoria_post AS Categoría_2025 FROM users WHERE rol = "Patinador/a" AND club = ?', [req.session.club], (err, listPat) => {
                    res.render('entrenamientosList', {listPat, rol: req.session.rol, email: req.session.email});
                });
            }  
        })   
    }   
}

/***************************************************************/
/* Función que para cargar la pagina Coreografías              */
/***************************************************************/
function coreografias (req, res){
    if(req.session.loggedin != true)
    {
        res.render('login');
    }
    else{ 
        res.render('coreografias', {rol: req.session.rol});
    }
}

module.exports = {
    home,
    perfil,
    entrenamientosPatinador,
    entrenamientosEntrenador,
    coreografias
}