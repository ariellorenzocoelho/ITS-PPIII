/* solicito la libreria express y lo guardo en la constante express */
const express = require('express');

/* Inicializo las funcionalidades de express en la constante ruta */
const ruta = express.Router();

/* Requiero la bbdd y la guardo en bbdd */
const bbdd = require('../database');

/* Creo una ruta para listar la entidad Factura */
ruta.get('/Factura', (req,res) => {

    /* PRUEBO EN INSOMNIA */ /* FUNCIONA EN INSOMNIA */
    //res.json('probando get de factura');

    /* consulto la base de datos esperando un error o filas */
    bbdd.query('select * from Factura',(err,rows) => {

        /* Si no hay error al realizar la consulta, muestro las filas en formato json */
        if(!err){
            res.json(rows);
        }else{ /* sino, muestro el siguiente mensaje de error. */
            res.json('Error al listar los datos de facturas');
        }
    });

});

/* Creo una ruta para eliminar una factura de la lista, teniendo el parametro id_factura */
ruta.delete('/Factura/:id_factura',  async  (req,res) => {

    /* PRUEBO EN INSOMNIA */
    //res.json('aca se elimina factura por insonia'); // FUNCIONA EN INSOMNIA

    /* creo una variable idf para guardar el id_factura que viene desde insomnia */
    var idf = req.params.id_factura;

    /* ejecuto consulta de delete en la base de datos esperando un error */

    await bbdd.query('delete from Factura where id_factura = ?',[idf], (err) => {

        /* Si no hay error al realizar el delete, muestro mensaje exitoso */
        if(!err){
            res.json('La Factura ha sido eliminada exitosamente!');
        }else{/* si hay error, muestro el msj de error crudo de mysql en JSON */
            res.json(err);
        }
    });

});

/* Creo ruta para almacenar una factura, obteniendo en unaFactura el cuerpo del json para llenar cada campo de factura en bbdd */
ruta.post('/Factura', (req,res) => {

    //res.json('almacenamos una factura');
    /* creo una constante unaFactura para guardar el cuerpo del json que proviene desde insomnia */
    const unaFactura = req.body;

    /* ejecuto consulta de insert en la base de datos esperando un error */

    bbdd.query('insert into Factura set ?',[unaFactura], (err) => {

        /* Si no hay error de ejecucion del insert, muestro mensaje exitoso*/
        if(!err){
            res.json('La Factura ha sido ingresada exitosamente!');
        }else{ /* Sino, muestro mensaje crudo de error de mysql */
            res.json(err);
        }
    });

});

/* Creo ruta para actualizar una FACTURA en particular por medio del id_factura */
ruta.put('/Factura/:id_factura', (req,res) => {

    //res.json('actualizamos factura por INSOMNIA');
    /* CONSULTA PARA DELFOR: TRANQUILAMENTE PODRIAN SER VARIABLES EN VEZ DE CONSTANTES ESTAS DOS CONSTANTES QUE SIGUEN? 
    ENTIENDO QUE SI. */
    
    const idf = req.params.id_factura; /* Guardo en una constante idf el valor requerido del parametro id_factura*/
    const unaFactura = req.body; /* Guardo en una constante el cuerpo requerido para actualizar una factura en json */

    /* Ejecuto consulta de UPDATE seteando con el cuerpo unaFactura donde factura sea igual al contenido de idf */
    
    bbdd.query('update Factura set ? where id_factura = ?',[unaFactura,idf], (err) => {

        /* Si no hay error de ejecucion del update, muestro mensaje exitoso*/
        if(!err){
            res.json('La factura ha sido actualizada exitosamente!');
        }else{ /* Sino, muestro mensaje crudo de error de mysql */
            res.json(err);
        }               
    });
});

/* Creo una ruta para listar UNA FACTURA por id*/
ruta.get('/Factura/:id_factura',(req,res) => {

    /* creo una variable idf para guardar el idfactura que viene desde insomnia */
    const idf = req.params.id_factura;

    /* Ejecuto consulta de listar donde factura sea igual al contenido de idf */
    bbdd.query('select * from Factura where id_factura = ?',[idf], (err,rows) => {

        /* Si no hay error al realizar la consulta, muestro la filas en formato json */
        if(!err)
        {
            res.json(rows); /* Para mostrar un solo elemento [0] */
        }else{ /* Sino, muestro mensaje crudo de error de mysql */
            res.json(err);
        }
    });
});

/* Creo ruta para buscar por nombre de cliente */
ruta.get('/FacturaCliente/:nombre_cliente',(req,res) => {

    /* creo una variable idf para guardar el idfactura que viene desde insomnia */
    var nc = req.params.nombre_cliente;

    /* Ejecuto consulta de listar donde factura sea igual al contenido de idf */
    bbdd.query("select * from Factura where nombre_cliente like '%" + nc + "%'", (err,rows) => {

        /* Si no hay error al realizar la consulta, muestro la filas en formato json */
        if(!err)
        {
            res.json(rows); /* Para mostrar un solo elemento [0] */
        }else{ /* Sino, muestro mensaje crudo de error de mysql */
            res.json(err);
        }
    });
});

/* Exporto el contenido de ruta para que sea utilizado por otra parte del codigo */
module.exports = ruta;


