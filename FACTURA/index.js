const app = new Vue({

    el:"#ppal",

    data:{
        nombre_producto:'',
        nombre_cliente:'',
        Iva:'',
        cantidad:null,
	    subtotal:'',
	    total:'',
	    forma_pago:'',
        lista_facturas:[],
        factura_a_buscar:null,
        cliente_a_buscar:null,
        id_factura:null,
        botonGuardar:true,
        botonEditar:true,
        botonActualizar:false,
        botonCancelar:false
    },

    methods:{

        // FUNCION PARA ASIGNAR ESTADO A BOTON GUARDAR
        estadoGuardar(estado)
        {
            this.botonGuardar = estado;
        },

        // FUNCION PARA ASIGNAR ESTADO A BOTON EDITAR
        estadoEditar(estado)
        {
            this.botonEditar = estado;
        },

        // FUNCION PARA ASIGNAR ESTADO A BOTON ACTUALIZAR
        estadoActualizar(estado)
        {   
            this.botonActualizar = estado;
        },

        // FUNCION PARA ASIGNAR ESTADO A BOTON CANCELAR
        estadoCancelar(estado)
        {   
            this.botonCancelar = estado;
        },

        // FUNCION PARA LIMPIAR DATOS DE INPUTS
        limpiarDatos()
        {
            this.nombre_producto = '';
            this.nombre_cliente = '';
            this.Iva = '';
            this.cantidad = '';
            this.subtotal = '';
            this.total = '';
            this.forma_pago = '';
        },

        // FUNCION PARA LLAMAR A LA BBDD Y LISTAR FACTURAS
        listarFacturas(){

            axios.get('http://localhost:3000/Factura').then(resultado => {

                /* guardamos los datos de la lista en lista_facturas */
                this.lista_facturas = resultado.data;

            });
        },

        // FUNCION PARA ELIMINAR UNA FACTURA PASANDO NRO DE FACTURA
        eliminarFactura(codigo_factura){

            axios.delete('http://localhost:3000/Factura/'+codigo_factura).then( resultado => {
                alert(resultado.data);
                this.listarFacturas();
            });

        },

        // FUNCION PARA GUARDAD UNA FACTURA NUEVA
        guardarFactura(){

            let unaFactura = {
                nombre_producto: this.nombre_producto,
                nombre_cliente: this.nombre_cliente,
                Iva: this.Iva,
                cantidad: this.cantidad,
                subtotal: this.subtotal,
                total: this.calcularTotal,
                forma_pago: this.forma_pago
            }

            axios.post('http://localhost:3000/Factura/',unaFactura).then( resultado => {
                //console.log(resultado);
                alert(resultado.data);
                
                //dDESPUES DE GUARDAR UNA NUEVA FACTURA, LISTO LA BBDD Y LIMPIO LOS INPUTS
                this.listarFacturas();
                this.limpiarDatos();

            });
            
            //REASIGNO ESTADOS PARA LOS BOTONES
            this.estadoEditar(true);
            this.estadoActualizar(false);
            this.estadoCancelar(false);
        },

        // FUNCION PARA BUSCAR UNA FACTURA POR NRO DE FACTURA
        buscarFactura(){

            axios.get('http://localhost:3000/Factura/'+this.factura_a_buscar).then( resultado => {

                this.lista_facturas = resultado.data;

            });

        },

        // FUNCION PARA BUSCAR UNA FACTURA POR NOMBRE CLIENTE
        
        buscarFacturaCliente(){

            axios.get('http://localhost:3000/FacturaCliente/'+this.cliente_a_buscar).then( resultado => {

                this.lista_facturas = resultado.data;

            });

        },

        /* Selecciona factura a editar y muestra los datos de la factura seleccionada */
        editarFactura(id_factura,nombre_producto,nombre_cliente,Iva,cantidad,subtotal,total,forma_pago){

            this.nombre_producto = nombre_producto;
            this.nombre_cliente = nombre_cliente;
            this.Iva = Iva;
            this.cantidad = cantidad;
   	        this.subtotal = subtotal;
	        this.total = '';
	        this.forma_pago = forma_pago;
            this.id_factura = id_factura;
            
            //REASIGNO ESTADOS PARA LOS BOTONES
            this.estadoGuardar(false);
            this.estadoEditar(false);
            this.estadoActualizar(true);
            this.estadoCancelar(true);
        },

        //CANCELO LA EDICION DE LA FACTURA PREVIAMENTE SELECCIONADA
        cancelarEditar(){

            //AL CANCELAR, LIMPIO LA TABLA EDITABLE Y VUELVO A LISTAR
            this.limpiarDatos();
            this.listarFacturas();

            //REASIGNO ESTADOS PARA LOS BOTONES
            this.estadoGuardar(true);
            this.estadoEditar(true);
            this.estadoActualizar(false);
            this.estadoCancelar(false);

        },

        // ACTUALIZO UNA FACTURA PREVIAMENTE SELECCIONADA
        actualizarFactura(){
            
            let unaFactura = {
                nombre_producto: this.nombre_producto,
                nombre_cliente: this.nombre_cliente,
                Iva: this.Iva,
                cantidad: this.cantidad,
                subtotal: this.subtotal,
		        total: this.calcularTotal,
		        forma_pago: this.forma_pago
            }
            axios.put('http://localhost:3000/Factura/'+this.id_factura,unaFactura).then( resultado => {

                alert(resultado.data);
                //UNA VEZ ACTUALIZADA LA FACTURA, LIMPIO LA TABLA EDITABLE Y VUELVO A LISTAR
                this.listarFacturas();
                this.limpiarDatos();
            });

            //REASIGNO ESTADOS PARA LOS BOTONES
            this.estadoEditar(true);
            this.estadoGuardar(true);
            this.estadoActualizar(false);
            this.estadoCancelar(false);
        }

    },

    // REALIZO EL COMPUTED PARA CALCULAR EL TOTAL DE (CANTIDAD * SUBTOTAL )+ IVA
    computed: {

        calcularTotal(){

            //Calculo resultado parcial de cantidad * subtotal
            var resultadoP = this.cantidad * this.subtotal;
            //Calculo resultado porcentaje iva
            var resultadoI = (resultadoP * this.Iva) / 100 ;
            //Calculo el resultado total
            var resultadoT = resultadoP + resultadoI;

            //retorno el resultado total
            return (resultadoT);
        },

    },

    created:function()
    {
        this.listarFacturas();
    }
})

