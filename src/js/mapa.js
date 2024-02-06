(function() {
    const lat = document.querySelector('#lat').value || 20.67444163271174; //Si esta vacio entonces 20.6744....
    const lng = document.querySelector('#lng').value || -103.38739216304566;
    const mapa = L.map('mapa').setView([lat, lng ], 16);

    let marker;

    // utilizar provider y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

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
                console.log(resultado.address.LongLabel)
            }

            marker.bindPopup(resultado.address.LongLabel)

            // LLenar los campos
            document.querySelector('.street').textContent = resultado?.address?.Address ?? ''
            document.querySelector('#street').value = resultado?.address?.Address ?? ''
            document.querySelector('#lat').value = resultado?.latlng?.lat ?? ''
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? ''
        })
    })

})()