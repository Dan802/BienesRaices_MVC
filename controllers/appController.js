import {Sequelize} from 'sequelize'
import {Precio, Categoria, Propiedad} from "../models/index.js"

const inicio = async (req, res) => {
        
    const categorias = await Categoria.findAll({raw: true})

    const precios = await Precio.findAll({raw: true})

    const [ casas, departamentos ] = await Promise.all([
        Propiedad.findAll({ // Para mostrar 3 casas en la vista principal
            limit: 3, 
            where: {
                categoryId: 1
            },
            include: [
                {
                    model: Precio, 
                    as: 'precio'
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Propiedad.findAll({ // Para mostrar 3 apartamentos en la vista principal
            limit: 3, 
            where: {
                categoryId: 2
            },
            include: [
                {
                    model: Precio, 
                    as: 'precio'
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    ])

    // Identificar si el usuario ya inició sesión
    let isAdmin = false
    if(req.usuario) {
        isAdmin = true
    }

    res.render('inicio',{
        page: 'Home',
        categorias,
        precios,
        casas,
        departamentos, 
        isAdmin
    })
}

const categoria = async (req, res) => {

    const { id } = req.params

    if( typeof id !== 'string'){
        return res.redirect('/')
    }

    // Comprobar que la categoria exista
    const categoria = await Categoria.findByPk(id)
    
    if(!categoria) {
        return res.redirect('/404')
    }

    // Obtener las propiedades de la categoria
    const propiedades = await Propiedad.findAll({
        where: {
            categoryId: id
        },
        include: [
            { model: Precio, as: 'precio' }
        ],
        limit: 100
    })

    // Identificar si el usuario ya inició sesión
    let isAdmin = false
    if(req.usuario) {
        isAdmin = true
    }


    res.render('categoria', {
        page: `${categoria.nombre}s for Sale`,
        propiedades,
        isAdmin
    })
}

const noEncontrado = (req, res) => {

    // Identificar si el usuario ya inició sesión
    let isAdmin = false
    if(req.usuario) {
        isAdmin = true
    }

    res.render('404', {
        page: 'Page not found',
        isAdmin
    })
}

const buscador = async (req, res) => {

    const {termino} = req.body

    // Validar que termino no este vacio
    if(!termino.trim()) {
        res.redirect('back')
    }

    // Consultar las propiedades
    const propiedades = await Propiedad.findAll({
        where: {
            title: {
                [Sequelize.Op.like] : '%' + termino + '%' //Busca coincidencias en cualquier lugar del titulo
            }
        },
        include: [
            {model: Precio, as: 'precio'}
        ]
    })

    // Identificar si el usuario ya inició sesión
    let isAdmin = false
    if(req.usuario) {
        isAdmin = true
    }

    res.render('busqueda', {
        page: `"${termino}" Search results`,
        propiedades,
        isAdmin
    })
}

export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}