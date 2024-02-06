const admin = (req, res) => {
    res.render('propiedades/admin', {
        page: 'My properties',
        barra: true
    })
}

const crear = (req,res) => {
    res.render('propiedades/crear', {
        page: 'Create property',
        barra: true
    })
}

export {admin, crear}