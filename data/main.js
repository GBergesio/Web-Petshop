const app = Vue.createApp({

    data() {
        return {
            message: 'Hello Vue!',
            productos: [],
            productosFilter: [],
            producto: [],
            filtroProductos: [],
            productosConBajoStock: [],
            productosConBajoStock2: [],
            productosCoinciden: [],
            buscar: "",
            mostrar: "false",
            productosFavoritos: [],
            productosFavoritosId: [],
            favoritosEnStorage: [],
            visibleEnd: false,
            productosCarrito: [],
            productosCarritoId: [],
            itemsCarritoEnStorage: [],
            resultadosBusqueda: [],
            sumaAux: 0,
            optionFiltro:"option1",
            productosFiltradosGeneral: [],
            user:'',
            user_pw: '',
            registrar_user_email:'',
            registrar_user_nombre :'',
            registrar_user_apellido:'',
            informacion_user_email:'',
            informacion_user_nombre:'',
            informacion_user_apellido:'',
            informacion_user_telefono:'',
            informacion_user_mensaje:'',
            // Notificacion
            $bvToast: "",
            registrado: false,
            consulto: false,
        }
    },

    created() {
        fetch(`https://apipetshop.herokuapp.com/api/articulos`)
            .then(response => response.json())
            .then(json => {
                let productos = json.response
                this.productos = productos
                this.productosCoinciden = productos


                // Local Storage Favoritos
                if (JSON.parse(localStorage.getItem("fav"))) {                             //Esto hace lo mismo
                    this.favoritosEnStorage = JSON.parse(localStorage.getItem("fav"))   // this.favoritosEnStorage = JSON.parse(localStorage.getItem("fav")) || this.favoritosEnStorage
                }
                this.productosFavoritos = this.favoritosEnStorage

                // Local Storage Cart
                if (JSON.parse(localStorage.getItem("cart"))) {
                    this.itemsCarritoEnStorage = [...JSON.parse(localStorage.getItem("cart"))]
                }
                this.productosCarrito = this.itemsCarritoEnStorage

                // Local Storage Carrito
            })
    },

    methods: {
        //PARA TODOS LOS PRODUCTOS
        buscador() {
            if (!this.buscar == "") {
                this.productosCoinciden = this.productos.filter(producto => producto.nombre.toLowerCase().includes(this.buscar.toLowerCase()))
                localStorage.removeItem("resultadoDeBusqueda")
                localStorage.setItem("resultadoDeBusqueda", JSON.stringify(this.productosCoinciden))
                this.mostrar = true;
            }
            else if (this.buscar == "") {
                localStorage.removeItem("resultadoDeBusqueda")
                this.mostrar = false;
            }
        },

        mostrarNotificacionFavorito() {

            let toastLiveExample = document.getElementById('liveToast1')
            let toast = new bootstrap.Toast(toastLiveExample)
            toast.show()
        },

        mostrarNotificacionCarrito() {

            let toastLiveExample1 = document.getElementById('liveToast2')
            let toast1 = new bootstrap.Toast(toastLiveExample1)
            toast1.show()

        },

        mostrarNotificacionMail() {
            let notificacionUsuarioButton = document.getElementById('mailenviado')
            let notificacionUsuario = new bootstrap.Toast(notificacionUsuarioButton)
            notificacionUsuario.show()
            this.registrado = true;
            this.consulto = true;
        },
        mostrarNotificacionCompraRealizada() {
            let notificacionComprarButton = document.getElementById('liveToast3')
            let notificacionComprar = new bootstrap.Toast(notificacionComprarButton)
            notificacionComprar.show()
        },
        vaciarCarrito() {
            this.productosCarrito = [];
            localStorage.removeItem("cart");
        },

        compraFinalizada() {
            this.sumaAux = sum;
            this.productosCarrito = [];
            localStorage.removeItem("cart");

        },
        refrescarPagina() {
            location.reload();
        },

        // Funciones de los botones Favoritos
        addFavorito(producto) {
            this.productosFavoritosId = this.productosFavoritos.map(producto => producto._id)
            if (!this.productosFavoritosId.includes(producto._id)) {
                this.productosFavoritos.push(producto)
                localStorage.setItem("fav", JSON.stringify(this.productosFavoritos))
                console.log(this.productosFavoritos)
                this.mostrarNotificacionFavorito()
            }
            // this.notificacionCarrito()
        },
        removerFavorito(producto) {
            this.favoritosEnStorage = this.favoritosEnStorage.filter(prod => prod._id !== producto._id)
            this.productosFavoritos = this.favoritosEnStorage
            localStorage.setItem("fav", JSON.stringify(this.favoritosEnStorage))
        },
        // Funciones de los botones Carrito
        addCart(producto) {
            this.productosCarritoId = this.productosCarrito.map(producto => producto._id)

            if (!this.productosCarritoId.includes(producto._id)) {
                this.productosCarrito.push(producto)
                localStorage.setItem("cart", JSON.stringify(this.productosCarrito))
                this.mostrarNotificacionCarrito()
                producto.__v++;
                // console.log(this.productosCarrito)
            }
        },
        removerItemCarrito(producto) {
            this.itemsCarritoEnStorage = this.itemsCarritoEnStorage.filter(prod => prod._id !== producto._id)
            this.productosCarrito = this.itemsCarritoEnStorage
            localStorage.setItem("cart", JSON.stringify(this.itemsCarritoEnStorage))
        },
        getAdd() {
            var sum = 0; // declara el precio total
            for (var i in this.productosCarrito) { // Recorrer la matriz marcada
                // suma + = cantidad y precio del valor verificado
                sum += this.productosCarrito[i].__v * this.productosCarrito[i].precio
            }
            return sum; // precio de devolucion
        },
        minimo(producto) {
            var num = producto.__v--;
            if (num === 1) {
                producto.__v = 1;
            }
        },
        contadorProductos() {
            var sum2 = 0; // declara el precio total
            for (var i in this.productosCarrito) { // Recorrer la matriz marcada
                // suma + = cantidad y precio del valor verificado
                sum2 += this.productosCarrito[i].__v * 1
            }
            return sum2; // precio de devolucion
        },
        contadorProductosComprados() {
            let aux = this.productosCarrito

            return aux
        },
        maximo(producto) {
            var num = producto.__v++;
            // if (producto.__v > producto.stock){
            //         let desactivarStock = document.querySelector()
            //     }
        },
        filtroMayorMenor() {
            this.productosFiltrados = this.productosFiltrados.sort(function (producto1, producto2) {
                return producto2.precio - producto1.precio
            })

        },
        filtroMenorMayor() {
            this.productosFiltrados = this.productosFiltrados.map().sort(function (producto1, producto2) {
                return producto1.precio - producto2.precio
            })
        },
        
        
        // filtroProductosMayorOMenor(){
        //     if(this.optionFiltro == "option1"){
        //         console.log("entre")
        //         return this.filtroProductos;
        //     }
        //     else if(this.optionFiltro == "option2"){
        //         let productosFiltradosMayorAMenor = this.filtroProductos
        //         productosFiltradosMayorAMenor = productosFiltradosMayorAMenor.sort(function (producto1, producto2) {
        //             return producto2.precio - producto1.precio
        //         })
        //         console.log(productosFiltradosMayorAMenor.precio)
        //     }
        //     else{
        //         let productosFiltradosMenorAMayor = this.filtroProductos
        //         productosFiltradosMenorAMayor = productosFiltradosMenorAMayor.sort(function (producto1, producto2) {
        //             return producto2.precio - producto1.precio
        //         })
        //     }
        // }
    },
    computed: {

        productosFiltrados() {
            this.filtroProductos = []
            if (document.querySelector(".juguete")) {
                this.filtroProductos = this.productos.filter(producto => producto.tipo == "Juguete")
            } else if (document.querySelector(".farmacia")) {
                this.filtroProductos = this.productos.filter(producto => producto.tipo == "Medicamento")
            } else {
                this.filtroProductos = this.productos.filter(producto => producto.stock < 5).slice(0, 4)
            }
            this.filtroProductosAux = this.filtroProductos
            
            if(this.optionFiltro == "option1"){
                this.filtroProductosAux = this.filtroProductos
            }
            else if(this.optionFiltro == "option2"){
                this.filtroProductosAux = this.filtroProductosAux.sort(function (producto1, producto2) {
                    return producto1.precio - producto2.precio
                })
            }
            else{
                this.filtroProductosAux = this.filtroProductosAux.sort(function (producto1, producto2) {
                    return producto2.precio - producto1.precio
                })
            }
            return this.filtroProductosAux
        },

        resultadoDeBusqueda() {
            return this.resultadosBusqueda = JSON.parse(localStorage.getItem("resultadoDeBusqueda"))
        },

    },
}).mount('#app')