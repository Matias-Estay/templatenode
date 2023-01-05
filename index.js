require("./models/index");
require('dotenv').config();
var mysql2 = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connection = require('./database/config');
// Base de datos
connection.dbConnection();

var MySQLStore = require('express-mysql-session')(session); 

var options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

var connectionsession = mysql2.createPool(options);
var sessionStore = new MySQLStore({}, connectionsession);

// Servidor
const app = express();

app.set("trust proxy", 1);

app.use(cookieParser(process.env.SECRET_SESSION));

//sessions
app.use(session({
name: "app_sesion" ,
secret:process.env.SECRET_SESSION, 
resave: false,
saveUninitialized: false,
unset: "destroy",
store: sessionStore,
cookie: {
    sameSite: "lax",
    secure: false,      
    httpOnly: true, 
    maxAge: 1000*60*24
    },
}));

app.use(cors({origin: process.env.DOMAIN_APP, credentials: true, methods: "GET, POST, PUT, DELETE"}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Credentials", true);
   res.header("Access-Control-Allow-Origin", process.env.DOMAIN_APP);
   res.header("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   next();  
})

// Public
// app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/AuthRoutes') );
app.use('/api', require('./routes/EmailRoutes') );
app.use('/api/views', require('./routes/ViewsRoutes') );

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
