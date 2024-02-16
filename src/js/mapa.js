//* Añadir en webpack.config.js
(function() {

    const lat = document.querySelector('#lat').value || 40.78693700939038; //Si esta vacio entonces 20.6744....
    const lng = document.querySelector('#lng').value || -73.96684521097656;
    const zoom = 15
    let marker;
    
    // Agregar mapa
    const mapa = L.map('mapa').setView([lat, lng ], zoom);

    // utilizar provider y geocoder para obtener la ubi del pin
    const geocodeService = L.esri.Geocoding.geocodeService();

    // Agregar la licencia open source
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Crear el pin
    marker = new L.marker([lat, lng], {
        draggable: true, // Podemos mover el marcador
        autoPan: true   // Se auto mueve el mapa cuando el pin es llevado al lateral del mapa
    }).addTo(mapa)

    // Detectar el movimiento del pin
    marker.on('moveend', function(e) {
        marker = e.target

        const posicion = marker.getLatLng();

        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

        // Obtener la información de las calles al soltar el pin
        geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado) {
            
            if(error) {
                console.log(error)
            } else {
                console.log(resultado)
                console.log(resultado.address.LongLabel)
            }

            marker.bindPopup(resultado.address.LongLabel)

            console.log('hola desde mapa')

            // LLenar los campos
            document.querySelector('.street').textContent = resultado?.address?.Address ?? ''
            document.querySelector('#street').value = resultado?.address?.Address ?? ''
            document.querySelector('#lat').value = resultado?.latlng?.lat ?? ''
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? ''
        })
    })

})()