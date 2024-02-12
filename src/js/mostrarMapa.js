(function(){

    const lat = document.querySelector('#lat').textContent
    const lng = document.querySelector('#lng').textContent
    const zoom = 16
    // const calle = document.querySelector('#streetProperty').textContent
    const titulo = document.querySelector('#titleMap').textContent

    // Agregar mapa
    const mapa = L.map('mostrarMapaJs').setView([lat, lng], zoom)

    // Agregar la licencia open source
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Agregar el Pin
    L.marker([lat, lng])
        .addTo(mapa)
        .bindPopup(titulo)
})()