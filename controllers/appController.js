import {Precio, Categoria, Propiedad} from "../models/index.js"

const inicio = async (req, res) => {

    const [ categorias, precios, casas, departamentos ] = await Promise.all([
        Categoria.findAll({raw: true}),
        Precio.findAll({raw: true}),
        Propiedad.findAll({ // Para mostrar 3 casas en la vista principal
            limit:3, 
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
            limit:3, 
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

const categoria = (req, res) => {

}

const noEncontrado = (req, res) => {

}

const buscador = (req, res) => {

}



export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}