import {Sequelize} from 'sequelize'
import {Precio, Categoria, Propiedad} from "../models/index.js"

const inicio = async (req, res) => {

    const [ categorias, precios, casas, departamentos ] = await Promise.all([
        Categoria.findAll({raw: true}),
        Precio.findAll({raw: true}),
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

    res.render('inicio',{
        page: 'Home',
        categorias,
        precios,
        casas,
        departamentos
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

    res.render('categoria', {
        page: `${categoria.nombre}s for Sale`,
        propiedades
    })
}

const noEncontrado = (req, res) => {
    res.render('404', {
        page: 'Page not found'
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

    res.render('busqueda', {
        page: `"${termino}" Search results`,
        propiedades,
    })
}

export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}