const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

const menuRoutes = require('./routes/menu')
const loginRoutes = require('./routes/login');
const userPerfilRoutes = require('./routes/userPerfil');
const entreneRoutes = require('./routes/entrene');

const app = express();
app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'tfg'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'), () => {
    console.log('Listening on port ', app.get('port'));
});

app.use('/', menuRoutes);
app.use('/', loginRoutes);
app.use('/', userPerfilRoutes);
app.use('/', entreneRoutes);

app.get('/', (req, res) => {
    if(req.session.loggedin == true)
    {
        res.render('perfil', { name: req.session.name,
                                password: req.session.password,
                                estado: req.session.estado,
                                categoria: req.session.categoria,
                                club: req.session.club, 
                                rol: req.session.rol,});
    }
    else{ 
        res.redirect('/login');
    }
})