/* requerimos el modulo mysql en la constante mysql */
const mysql = require('mysql');

/* creo constante bbdd para almacenar las credenciales de la bbdd */
const bbdd = mysql.createConnection({
    host:'localhost',
    user:'userapivue',
    password:'userapivue',
    database:'vue_api_db'
});

/* utilizo el metodo connect para conectarme a la bbdd */
bbdd.connect();

/* exporto la base de datos para que pueda ser utilizada en otro lugar del codigo*/
module.exports = bbdd;