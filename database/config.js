var mysql = require('mysql2');
require('dotenv').config();

const dbConnection = ()=>{
    var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
    });

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
    });
    global.con = con
}

module.exports={
    dbConnection
}
