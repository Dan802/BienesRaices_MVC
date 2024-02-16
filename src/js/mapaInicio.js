//* Añadir en webpack.config.js
(function () {

    const lat = 40.78693700939038;
    const lng = -73.96684521097656;
    const zoom = 13;
    
    // Agregar mapa
    const mapa = L.map('mapa-inicio').setView([lat, lng ], zoom)
    let markers = new L.FeatureGroup().addTo(mapa)

    let propiedades = [];

    const categoriasSelect = document.querySelector('#categorias')
    const preciosSelect = document.querySelector('#precios')

    const filtros = { categoria: '', precio: '' }

    // Agregar la licencia open source
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Añadir evento para filtrar por categoria
    categoriasSelect.addEventListener('change', e => {
        filtros.categoria =+ e.target.value
        filtrarPropiedades()
    })

    // Añadir evento para filtrar por precios
    preciosSelect.addEventListener('change', e => {
        filtros.precio =+ e.target.value
        filtrarPropiedades()
    })

    const obtenerPropiedades = async () => {

        try {

            const url = '/api/properties'
            const respuesta = await fetch(url)
            propiedades = await respuesta.json()

        } catch (error) {
            console.log(error)
        }

        if(categoriasSelect.value) {
            
            filtros.categoria =+ categoriasSelect.value
            filtrarPropiedades()

        } else if(preciosSelect.value) {

            filtros.precio =+ preciosSelect.value
            filtrarPropiedades()
            
        } else {
            mostrarPropiedades(propiedades)
        }

    }
    
    const mostrarPropiedades = propiedades => {

        // Limpiar los markes previos
        markers.clearLayers()

        propiedades.forEach(propiedad => {

            // agregar los pines
            // propiedad?.lat devuelve undefined si propiedad no existe
            const marker = new L.marker([propiedad?.lat, propiedad?.lng ], {
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(`
                <h1 class="text-xl font-extrabold my-5">${propiedad?.title}</h1>

                <img src="uploads/${propiedad?.imagen}" alt="Imagen de la propiedad ${propiedad?.title}" class="max-h-5">

                <p class="text-indigo-600 font-bold">${propiedad?.categoria.nombre}</p>
                <p class="text-gray-600 font-bold">${propiedad?.precio.nombre}</p>

                <a href="/property/${propiedad.id}" class="bg-indigo-600 block p-2 text-center font-bold">See Property</a>
            `)

            markers.addLayer(marker)
        })
    }

    const filtrarPropiedades = () => {
        // resultado: arreglo nuevo
        const resultado = propiedades.filter( filtrarCategoria ).filter( filtrarPrecios )

        mostrarPropiedades(resultado)
    }

    const filtrarCategoria = propiedad => {

        // si hay filtros.categoria entonces...
        // itera en el areglo de propiedades
        // si la propiedad.categoryId es igual al id seleccionado en filtros.categoria
        // retorna los elementos que coinciden
        return filtros.categoria ? propiedad.categoryId === filtros.categoria : propiedad
    }

    const filtrarPrecios = propiedad => {
        return filtros.precio ? propiedad.priceId === filtros.precio : propiedad
    }

    obtenerPropiedades()

})()