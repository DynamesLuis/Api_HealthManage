const mysql = require('mysql2');
const config_BD = require('../config/config_BD');


const connection = mysql.createConnection({
    host: config_BD.HOST,
    user: config_BD.USER,
    password: config_BD.PASSWORD,
    database: config_BD.BD,
});

connection.connect(error=>{
    if(error) throw error;
    console.log("Conección exitosa");
});

module.exports = connection;