const esVendedor = (usuarioId, propiedadUsuarioId) => {
    return usuarioId === propiedadUsuarioId
}

const formatearFecha = fecha => {
    const fechaLarga = new Date(fecha).toISOString() // 2024-02-17T23:24:50.000Z
    const nuevaFecha = fechaLarga.slice(0, 10) // 2024-02-17

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Date(nuevaFecha).toLocaleDateString('es-ES', opciones)
}

export {
    esVendedor,
    formatearFecha
}