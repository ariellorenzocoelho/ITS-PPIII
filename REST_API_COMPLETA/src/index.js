/* 
/* requerimos la libreria express en la constante express */
const express = require('express'); 

/* requerimos la libreria cors */
const cors = require('cors');

/* inicializamos las funcionalidades de express en la constante servidorApp */
const servidorApp = express();

/* seteo la variable port de express con algun puerto disponible o el 3000 si no hay otro */
servidorApp.set('port', process.env.PORT || 3000);

/* configuro de manera global en envio y recepcion de datos en JSON */
servidorApp.use(express.json());

/* Nos permite la comunicacion entre servidores: cliente vue y API */
servidorApp.use(cors());

/* configuro el servidor para que utilice las rutas en ruta.factura */
servidorApp.use(require('./rutas/ruta.factura'));

/* hacemos que el servidor escuche el puerto almacenado en la variable port */
servidorApp.listen(servidorApp.get('port'));

/* escribo en consola el puerto donde se esta ejecutando el servidor */
console.log('Servidor ejecutandose en el puerto ', servidorApp.get('port'));



