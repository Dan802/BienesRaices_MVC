import { validationResult} from "express-validator"
import { Precio, Categoria, Propiedad } from '../models/index.js'

const admin = (req, res) => {
    res.render('propiedades/admin', {
        page: 'My properties',
        barra: true
    })
}

const crear = async (req,res) => {

    // Obtenemos los precios y categorias de la BD
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear', {
        page: 'Create property',
        barra: true,
        categorias, 
        precios,
        datos: {}
    })
}

const guardar = async (req, res) => {
    
    // Resultado Validacion
    let resultado = validationResult(req)

    if(!resultado.isEmpty()) {

         // Obtenemos los precios y categorias de la BD
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        
        return res.render('propiedades/crear', {
            page: 'Create property',
            barra: true,
            categorias, 
            precios, 
            errores: resultado.array(),
            datos: req.body
        })
    }

    // Guardar la propiedad en al BD

    const {title, description, category : categoryId, price : priceId, rooms, parking_lot, wc, street, lat, lng } = req.body

    try {
        const propiedadGuardada = await Propiedad.create({
            title,
            description,
            rooms,
            parking_lot,
            wc, 
            street,
            lat,
            lng,
            categoryId,
            priceId
        })
        
    } catch (error) {
        console.log(error)
    }
    console.log(req.body)

}

export {
    admin,
    crear,
    guardar
}